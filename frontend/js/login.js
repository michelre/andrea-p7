
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const login = e.target.email.value
  const password = e.target.password.value

  axios.post('http://localhost:3000/login', { login, password }).then((resp) => {
    if (resp.data.status === 'OK') {
      //window.location.href = 'index.html'
    }
  })
});
