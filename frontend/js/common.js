const logout = document.querySelector('.menu .logout')

logout.addEventListener('click', () => {
    localStorage.removeItem('api-token')
    window.location.href = 'login.html'
})