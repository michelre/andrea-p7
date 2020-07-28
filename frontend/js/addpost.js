const messageForm = document.querySelector('#message-form');


const tokenKey = {
    headers: { 'Authorization': "bearer " + localStorage.getItem("api-token") }
};

console.log(tokenKey);

messageForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.title.value
    const post = e.target.post.value


    axios.post('http://localhost:3000/api/messages/new', { title, post, tokenKey }).then((resp) => {
        console.log(resp.data.token);

    })
});


