function myFunction(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.innerText = message
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
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
                    document.getElementById('name').innerText = `Hi, ${res.user._username.substring(0, 6)}👋`
                } else {
                    window.location.href = '/client/views/login.html'
                }
            } else {
                window.location.href = '/client/views/login.html'
            }
        })
} else {
    window.location.href = '/client/views/login.html'
}

const d = new Date()
document.getElementById('date').innerText = d.toString()

const changePage = (destination) => {
    if (destination === 'dashboard') {
        document.getElementById('dashboard').style.display = 'block'
        document.getElementById('hospitals').style.display = 'none'
        document.getElementById('emergency').style.display = 'none'
        document.getElementById('dashboard__menu').classList.add('active')
        document.getElementById('hospitals__menu').classList.remove('active')
        document.getElementById('emergency__menu').classList.remove('active')
    } else if (destination === 'hospitals') {
        document.getElementById('dashboard').style.display = 'none'
        document.getElementById('hospitals').style.display = 'block'
        document.getElementById('emergency').style.display = 'none'
        document.getElementById('dashboard__menu').classList.remove('active')
        document.getElementById('hospitals__menu').classList.add('active')
        document.getElementById('emergency__menu').classList.remove('active')
    } else if (destination === 'emergency') {
        document.getElementById('dashboard').style.display = 'none'
        document.getElementById('hospitals').style.display = 'none'
        document.getElementById('emergency').style.display = 'block'
        document.getElementById('dashboard__menu').classList.remove('active')
        document.getElementById('emergency__menu').classList.add('active')
        document.getElementById('hospitals__menu').classList.remove('active')
    }
}


var map;
var map2;

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pyrmont = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map = new google.maps.Map(document.getElementById("map"), {
                center: pyrmont,
                zoom: 18
            });

            map2 = new google.maps.Map(document.getElementById("map2"), {
                center: pyrmont,
                zoom: 18
            });

            // Create the places service.
            var service = new google.maps.places.PlacesService(map);

            var service2 = new google.maps.places.PlacesService(map2);

            // Perform a nearby search.
            service.nearbySearch(
                {
                    location: pyrmont,
                    radius: 4000,
                    types: ["hospital", 'health']
                },
                function (results, status, pagination) {
                    if (status !== "OK") return;

                    createMarkers(results);
                    getNextPage =
                        pagination.hasNextPage &&
                        function () {
                            pagination.nextPage();
                        };
                }
            );

            service2.nearbySearch(
                {
                    location: pyrmont,
                    radius: 4000,
                    types: ["hospital", 'health']
                },
                function (results, status, pagination) {
                    if (status !== "OK") return;

                    createMarkers2(results);
                    getNextPage =
                        pagination.hasNextPage &&
                        function () {
                            pagination.nextPage();
                        };
                }
            );
        });
    } else {
        alert('No geolocation services...')
    }
}

function createMarkers(places) {
    console.log({ places })
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; (place = places[i]); i++) {
        const hospitalData = {
            name: place.name,
            vicinity: place.vicinity,
            ratings: place.ratings,
            status: place.business_status
        }

        var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
        });

        marker.addListener('click', () => {
            document.getElementById('emergency__wrapper').style.display = 'flex'
            document.getElementById('hospital__name').innerText = `Hospital Name: ${hospitalData.name}`
            document.getElementById('hospital__address').innerText = `Hospital Name: ${hospitalData.vicinity}`
            document.getElementById('hospital__status').innerText = `Hospital Name: ${hospitalData.status}`
            document.getElementById('hospital__rating').innerText = `Hospital Name: ${hospitalData.ratings}`
        })

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function createMarkers2(places) {
    console.log({ places })
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; (place = places[i]); i++) {
        const hospitalData = {
            name: place.name,
            vicinity: place.vicinity,
            ratings: place.rating,
            status: place.business_status
        }

        var marker = new google.maps.Marker({
            map: map2,
            title: place.name,
            position: place.geometry.location
        });

        marker.addListener('click', () => {
            console.log('Clicked')
            document.getElementById('emergency__wrapper').style.display = 'flex'
            document.getElementById('hospital__name').innerText = `Hospital Name: ${hospitalData.name}`
            document.getElementById('hospital__address').innerText = `Hospital Name: ${hospitalData.vicinity}`
            document.getElementById('hospital__status').innerText = `Hospital Name: ${hospitalData.status}`
            document.getElementById('hospital__rating').innerText = `Hospital Name: ${hospitalData.ratings}/5`
        })

        bounds.extend(place.geometry.location);
    }
    map2.fitBounds(bounds);
}

const sendEmergencyRequest = () => {
    fetch("http://localhost:1337/api/auth/emergency", {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            'auth-token': userAuthToken
        }
    }).then(res => res.json())
        .then((res) => {
            if (res.type === 'error') {
                myFunction('Internal server error...')
            } else {
                myFunction('Mail send succesfully')
            }
        })
}