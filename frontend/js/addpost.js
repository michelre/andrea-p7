const messageForm = document.querySelector('#message-form');


const tokenKey = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};


messageForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.post.value


    axios.post('http://localhost:3000/api/messages/new', { title, content }, tokenKey)
        .then((resp) => {
            console.log(resp);

        })
});


