console.log('Login script in sync')

function myFunction(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.innerText = message
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

const loginUser = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email && password) {
        fetch("http://localhost:1337/api/auth/login", {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                'usercred': email,
                'password': password
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.type === 'error') {
                    if (res.message === 'Credentials fields are not filled up properly') {
                        myFunction('Please fill up all the fields...')
                    } else if (res.message === 'Internal server error') {
                        myFunction('Internal server error...')
                    } else if (res.message === 'Wrong credentials entered') {
                        myFunction('Wrong credentials entered...')
                    } else {
                        myFunction(res.message)
                    }
                } else {
                    if (res.message === 'Login successfull') {
                        myFunction('Login successfull...')
                        window.localStorage.setItem('medweb.user.auth.token', JSON.stringify(res.credentials.authToken))
                        window.location.href = '/client/views/dashboard.html'
                    } else {
                        myFunction(res.message)
                    }
                }
            })
            .catch(err => {
                console.log(err)
                myFunction('Some error occured in the fetch api...')
            })
    } else {
        myFunction('Please fill up all the fields...')
    }
}

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
                    window.location.href = '/client/views/dashboard.html'
                }
            }
        })
}