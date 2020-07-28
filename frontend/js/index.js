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
        const h1 = document.createElement('h1');
        div.appendChild(h1);
        h1.innerHTML = messages[i].User.firstName + '<br>' + messages[i].User.lastName;

        // ajout de h2 = titre 
        const h2 = document.createElement('h2');
        div.appendChild(h2);
        h2.innerHTML = messages[i].title;

        // ajout de p = message
        const p = document.createElement("p"); //creation d' un paragraphe
        div.appendChild(p);

        p.innerHTML = messages[i].content; // ajout du message dans p

        const span = document.createElement('span');
        div.appendChild(span);
        let newDate = moment(messages[i].createdAt).format('LLL');
        span.innerHTML = newDate;



        // a.href = "produits.html?id=" + articles[i]._id;

    }
};
