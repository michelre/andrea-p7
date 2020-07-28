class Ajax {

    get(url) {
        return new Promise((resolve, reject) => {
            //creation et envoie objet requete
            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.send();
            //attente reponse et appel fonction de retour
            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        // si tout c'est bien passée
                        resolve(JSON.parse(this.responseText)); // recuperation de la liste de produits
                    } else {
                        reject()
                    }
                }
            }
        });
    };


    post(url, order) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(order));

            //attente reponse et appel fonction de retour
            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 201) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject()
                    }
                }
            }
        });
    }
}
