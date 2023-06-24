var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("app__navbar").style.top = "0";
    } else {
        document.getElementById("app__navbar").style.top = "-90px";
    }
    prevScrollpos = currentScrollPos;
}

const loader = document.getElementById('loader')
setTimeout(() => {
    loader.style.display = 'none'
    document.getElementById("app__navbar").style.display = "flex";
    document.getElementById("app__parallax").style.display = "flex";
}, 5000);


const userAuthToken = JSON.parse(window.localStorage.getItem('medweb.user.auth.token'))
if (userAuthToken) {
    fetch("http://localhost:1337/api/auth/user", {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            'auth-token': userAuthToken
        }
    }).then((res) => res.json())
        .then((res) => {
            if (res.type !== 'error') {
                if (res.message === 'User data fetched successfully') {
                    window.localStorage.setItem('medweb.user.data', JSON.stringify(res.user))
                    document.getElementById('login').innerText = 'Dashboard'
                    document.getElementById('login').href = 'http://127.0.0.1:5500/client/views/dashboard.html'
                } else {
                    document.getElementById('login').innerText = 'Login'
                    document.getElementById('login').href = 'http://127.0.0.1:5500/client/views/login.html'
                }
            } else {
                document.getElementById('login').innerText = 'Login'
                document.getElementById('login').href = 'http://127.0.0.1:5500/client/views/login.html'
            }
        })
} else {
    document.getElementById('login').innerText = 'Login'
    document.getElementById('login').href = 'http://127.0.0.1:5500/client/views/login.html'
}