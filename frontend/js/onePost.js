let params = new URL(document.location).searchParams;
let idMessage = params.get("id");

const headers = {
    headers: {'Authorization': "Bearer " + localStorage.getItem("api-token")}
};

axios.get("http://localhost:3000/api/messages/" + idMessage, headers)
    .then(({data: message}) => {
            const title = document.querySelector('#title')
            const post = document.querySelector('#post')
            title.value = message.title
            post.value = message.content
        },
    );

const form = document.querySelector('#message-form')

form.addEventListener('submit', function(e){
    e.preventDefault()
    const title = e.target.title.value;
    const content = e.target.post.value;

    const data = {
        title,
        content
    }

    axios.put("http://localhost:3000/api/messages/" + idMessage, data, headers).then(() => {
        window.location.href = 'index.html'
    })

    console.log(title, post)
})


const onePost = (post) => {


    // ajout nom du produit
    // const name = document.getElementById("title-post");
    // name.innerHTML = post;


}
/*

// fonction pour montrer la liste des produits
const onePost = (post) => {

  // ajout nom du produit
  const name = document.getElementById("h3-article");
  name.innerHTML = article.name;

  // ajout prix
  const price = document.getElementById("price-article");
  price.innerHTML = article.price + " €";

  // ajout description
  const description = document.getElementById("description-article");
  description.innerHTML = article.description;

  // ajout menu deroulant
  const lenses = article.lenses;
  for (let lens of lenses) {
    const option = document.createElement("option");
    const parent = document.getElementById("lentilles");
    parent.appendChild(option);
    option.innerHTML = lens;
  }
};

*/
