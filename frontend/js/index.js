const ajax = new Ajax();
ajax.get("http://localhost:3000/api/messages")
    .then((messages) => {
        listMessages(messages); //appel de la fonction d'affichage des messages
    });

//declaration de la fonction d'affichage des messages
const listMessages = (messages) => {
    for (let i in messages) {

        // creation de la div 
        const div = document.createElement('div')
        div.className = "post"; // ajout de la class
        const parent = document.getElementById("listMessages"); // ou je vais appliquer la div
        parent.appendChild(div); // ajout de div dans l'element parent

        // ajout du user
        // const h1 = document.createElement('h1');
        // div.appendChild(h1);
        // h1.innerHTML = messages[i].User.firstName + '<br>' + messages[i].User.lastName;

        // ajout de h2 = titre 
        const h2 = document.createElement('h2');
        div.appendChild(h2);
        h2.innerHTML = messages[i].title;

        // message
        const p = document.createElement("p"); //creation d' un paragraphe
        div.appendChild(p);

        p.innerHTML = messages[i].content; // ajout du message dans p

        // date et heure
        const span = document.createElement('span');
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
        spanLikes.innerHTML = messages[i].likes + " J'aime";

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

    }
};


//envoie du like ou dislike
const likeSubmit = document.querySelector(".btn-likes");

const tokenKey = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

likeSubmit.addEventListener('submit', function (e) {

    axios.post('http://localhost:3000/api/messages/:messageId/vote/like', tokenKey)
        .then((resp) => {

            console.log(resp);
        })
});