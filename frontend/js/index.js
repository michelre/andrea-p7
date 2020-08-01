const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

axios.get("http://localhost:3000/api/messages", headers).then((data) => {
    listMessages(data.data); //appel de la fonction d'affichage des messages
});

//declaration de la fonction d'affichage des messages
const listMessages = (messages) => {
    for (let i in messages) {

        let nbLikes = messages[i].likes;

        // creation de la div
        const div = document.createElement('div')
        div.className = "post"; // ajout de la class
        const parent = document.getElementById("listMessages"); // ou je vais appliquer la div
        parent.appendChild(div); // ajout de div dans l'element parent


        //ajout de h2 = titre 
        const h1 = document.createElement('h1');
        h1.className = 'title-post';
        div.appendChild(h1);
        h1.innerHTML = messages[i].title;

        // message
        const p = document.createElement("p"); //creation d' un paragraphe
        div.appendChild(p);
        p.innerHTML = messages[i].content; // ajout du message dans p

        //ajout du user
        const h2 = document.createElement('h2');
        h2.className = 'author';
        div.appendChild(h2);
        h2.innerHTML = 'Post ajouté par: ' + messages[i].User.firstName + ' ' + messages[i].User.lastName;


        // date et heure
        const span = document.createElement('span');
        span.className = 'span-post';
        div.appendChild(span);
        let newDate = moment(messages[i].createdAt).format('LLL');
        span.innerHTML = newDate;

        // like et dislike
        const divLikesDislike = document.createElement('div');
        divLikesDislike.className = 'content-likes';
        div.appendChild(divLikesDislike);

        // lien pour like
        const divLikes = document.createElement('div');
        divLikes.className = 'div-likes';
        divLikesDislike.appendChild(divLikes);

        const btnLikes = document.createElement('button');
        btnLikes.className = 'btn-likes';
        divLikes.appendChild(btnLikes);

        const imgLikes = document.createElement('img');
        imgLikes.className = "likes-icon";
        imgLikes.src = "https://img.icons8.com/material-outlined/50/000000/facebook-like.png";
        btnLikes.appendChild(imgLikes);

        // nombres likes
        const spanLikes = document.createElement('span');
        spanLikes.className = 'span-likes'
        divLikes.appendChild(spanLikes);
        spanLikes.innerHTML = nbLikes + " J'aime";

        // lien pour dislike
        const divDislikes = document.createElement('div');
        divDislikes.className = 'div-dislikes';
        divLikesDislike.appendChild(divDislikes);

        const btnDislikes = document.createElement('button');
        btnDislikes.className = 'btn-dislikes';
        divDislikes.appendChild(btnDislikes);

        const imgDislikes = document.createElement('img');
        imgDislikes.className = "dislikes-icon";
        imgDislikes.src = "https://img.icons8.com/material-outlined/50/000000/facebook-like.png";
        btnDislikes.appendChild(imgDislikes);

        if (messages[i].modifiable) {
            const modifiableLink = document.createElement('a')
            modifiableLink.className = 'modify-post'
            modifiableLink.href = `onepost.html?id=${messages[i].id}`
            modifiableLink.innerHTML = 'Modifier'
            div.appendChild(modifiableLink)
        }
        if (messages[i].modifiable) {
            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'delete-post'
            deleteBtn.innerHTML = 'Effacer'
            div.appendChild(deleteBtn)

            deleteBtn.addEventListener('click', () => {
                axios.delete(`http://localhost:3000/api/messages/delete/${messages[i].id}`, headers)
                    .then((resp) => {
                        console.log(resp);
                    })
            })
        }

        btnLikes.addEventListener('click', () => {
            axios.post(`http://localhost:3000/api/messages/${messages[i].id}/vote/like`, {}, headers).then((resp) => {
                nbLikes += 1
                spanLikes.innerHTML = nbLikes + " J'aime";
            })
        })

        btnDislikes.addEventListener('click', () => {
            axios.post(`http://localhost:3000/api/messages/${messages[i].id}/vote/dislike`, {}, headers).then((resp) => {
                nbLikes -= 1
                spanLikes.innerHTML = nbLikes + " J'aime";
            })
        })


    }
};
