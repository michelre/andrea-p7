const messageForm = document.querySelector('#message-form');


const tokenKey = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};


messageForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.post.value
    const image = e.target.img.value //***********************************//


    axios.post('http://localhost:3000/api/messages/new', { title, content, image }, tokenKey)
        .then((resp) => {
            window.location.href = 'index.html'

        })

});


