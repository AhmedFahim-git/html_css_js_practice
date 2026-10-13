const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");
const usernamePEl = document.getElementById("username-er-info");
const emailPEl = document.getElementById("email-er-info");
const passwordPEl = document.getElementById("password-er-info");
const confirmPasswordPEl = document.getElementById("confirm-password-er-info");
const submitBtn = document.getElementById("submit-btn");
const registerForm = document.getElementById("registration-form");

function checkUsername() {
	const username = usernameEl.value.trim();
	let passed = false;
	let message = "";
	if (username.length === 0) message = "Username is required";
	else if (username.length < 3)
		message = "Username needs to be more than three letters";
	else passed = true;
	usernamePEl.textContent = message;
	if (passed) {
		usernameEl.classList.remove("incorrect");
		usernameEl.classList.add("correct");
		usernamePEl.classList.remove("error");
	} else {
		usernameEl.classList.remove("correct");
		usernameEl.classList.add("incorrect");
		usernamePEl.classList.add("error");
	}
	return { passed, value: username };
}
function checkEmail() {
	const email = emailEl.value.trim();
	let passed = false;
	let message = "";
	if (email.length === 0) message = "Email is required";
	else if (!/^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/.test(email))
		message = "Email is not valid";
	else passed = true;
	emailPEl.textContent = message;
	if (passed) {
		emailEl.classList.remove("incorrect");
		emailEl.classList.add("correct");
		emailPEl.classList.remove("error");
	} else {
		emailEl.classList.remove("correct");
		emailEl.classList.add("incorrect");
		emailPEl.classList.add("error");
	}
	return { passed, value: email };
}
function checkPassword() {
	const password = passwordEl.value.trim();
	let passed = false;
	let message = "";
	if (password.length === 0) message = "Password is required";
	else if (!/[a-z]+/.test(password))
		message = "Password should have at least one lowercase letter";
	else if (!/[A-Z]+/.test(password))
		message = "Password should have at least one uppercase letter";
	else if (!/\d+/.test(password))
		message = "Password should have at least one number";
	else if (/\s+/.test(password))
		message = "Password should not have any whitespace";
	else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))
		message = "Password should be at least 8 characters";
	else passed = true;
	passwordPEl.textContent = message;
	if (passed) {
		passwordEl.classList.remove("incorrect");
		passwordEl.classList.add("correct");
		passwordPEl.classList.remove("error");
	} else {
		passwordEl.classList.remove("correct");
		passwordEl.classList.add("incorrect");
		passwordPEl.classList.add("error");
	}
	return { passed, value: password };
}
function checkConfirmPassword() {
	const password = passwordEl.value.trim();
	const confirmPassword = confirmPasswordEl.value.trim();
	let passed = false;
	let message = "";
	if (confirmPassword.length === 0) message = "Confirm password is required";
	else if (password !== confirmPassword) message = "Passwords do not match";
	else passed = true;
	confirmPasswordPEl.textContent = message;
	if (passed) {
		confirmPasswordEl.classList.remove("incorrect");
		confirmPasswordEl.classList.add("correct");
		confirmPasswordPEl.classList.remove("error");
	} else {
		confirmPasswordEl.classList.remove("correct");
		confirmPasswordEl.classList.add("incorrect");
		confirmPasswordPEl.classList.add("error");
	}
	return { passed, value: confirmPassword };
}
function reset() {
	document
		.querySelectorAll("fieldset > input")
		.forEach((element) => element.classList.remove("correct"));
}

registerForm.addEventListener("submit", (ev) => {
	ev.preventDefault();
	const usernameRes = checkUsername();
	const emailRes = checkEmail();
	const passwordRes = checkPassword();
	const confirmPasswordRes = checkConfirmPassword();
	if (
		usernameRes["passed"] &&
		emailRes["passed"] &&
		passwordRes["passed"] &&
		confirmPasswordRes["passed"]
	) {
		alert("Registration complete");
		ev.target.reset();
		reset();
	}
});
