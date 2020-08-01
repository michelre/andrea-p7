let params = new URL(document.location).searchParams;
let idUser = params.get("id");

const ajax = new Ajax();
ajax.get("http://localhost:3000/api/messages/" + idUser)
  .then((messages) => {

    onePost(messages);


  },
    () => {
      console.log(messages);
    }
  );




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