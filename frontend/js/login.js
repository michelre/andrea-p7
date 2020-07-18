const btn = document.getElementById ('btn');

const email = document.getElementById("email");
const password = document.getElementById("password");



// pour vérifier les données de l'utilisateur
const validForm = async (regex, label, key) => {
    if (regex.test(label.value)) {
      const result = await localStorage.setItem(key, label.value); // je sauvegarde l'info en local storage
      console.log("code valide");
      btn.removeAttribute("disabled", "");
      btn.style.opacity = 1;
   
    } else {
      console.log("CODE INVALIDE !!!!!");
      btn.setAttribute("disabled", "");
      btn.style.opacity = 0.5;
    }
  };
  
  // si il y a l'info dans local storage je l'affiche par default
  const showLocalStorage = (label, key) => {
    if (localStorage.getItem(key)) {
      label.setAttribute("value", localStorage.getItem(key));
    }
  };
  
  // expressions régulières
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/i;
  const regPassword = /^([A-Z a-z])\w+/g

 email.addEventListener("input", (e) => {
    validForm(regEmail, email, "email");
  });

  password.addEventListener("input", (e) => {
    validForm(regPassword, password, "password");
  });
  
  
  // fonction pour envoyer la commande
  const sendUser = () => {
    btn.addEventListener("click", () => {

        event.preventDefault();

      let userMail = localStorage.getItem("email");
      let userPassword = localStorage.getItem('password')
  

  
      // creation de l' objet contenant les info de l'utilisateur
      const contact = {
        email: userMail,
        password: userPassword
      };
  
  
      const send = (event) => {
        
        axios.post("http://localhost:3000/login", contact)
          .then((response) => {
            localStorage.setItem("contact", JSON.stringify(response));
            console.log(response);
          }, () => {
            alert("Veuillez remplir le formulaire avant de valider votre commande");
          })
      };
      send(); // appel de la fonction pour l'envoye de la commande
    });
  };

  sendUser();




// axios.post('http://localhost:3000/login').then((resp) => {
//     console.log(resp.headers)
//     console.log(JSON.stringify(jsonBody));
// })



