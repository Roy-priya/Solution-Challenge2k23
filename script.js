// Smooth scroll to content when clicking on the Explore button
document.querySelector('.btn').addEventListener('click', function(e) {
	e.preventDefault();
	document.querySelector('content1').scrollIntoView({
		behavior: 'smooth'
	});
    document.querySelector('content2').scrollIntoView({
		behavior: 'smooth'
	});
});
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

loginBtn.addEventListener("click", function() {
	loginForm.classList.add("show");
	signupForm.classList.remove("show");
});

signupBtn.addEventListener("click", function() {
	signupForm.classList.add("show");
	loginForm.classList.remove("show");
});
