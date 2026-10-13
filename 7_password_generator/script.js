const pswd = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const copyIcon = document.getElementById("copy-icon");
const pswdLengthInput = document.getElementById("password-length");
const pswdLengthShow = document.getElementById("password-length-show");
const pswdUppercase = document.getElementById("uppercase-include");
const pswdLowercase = document.getElementById("lowercase-include");
const pswdNumber = document.getElementById("number-include");
const pswdSymbol = document.getElementById("symbols-include");
const generatePswd = document.getElementById("generate-pswd-btn");
const pswdStrengthText = document.getElementById("pswd-strength-text");
const pswdStrengthIndicator = document.getElementById(
	"password-strength-indicator",
);

const numbers = "0123456789";

const lowercase = "abcdefghijklmnopqrstuvwxyz";

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function generatePassword() {
	let charsToUse = "";
	if (pswdUppercase.checked) charsToUse += uppercase;
	if (pswdLowercase.checked) charsToUse += lowercase;
	if (pswdNumber.checked) charsToUse += numbers;
	if (pswdSymbol.checked) charsToUse += symbols;
	if (charsToUse.length == 0)
		alert("Please select at least one character type");
	else {
		const newPswd = Array.from(
			{ length: Number(pswdLengthInput.value) },
			() => charsToUse[Math.floor(Math.random() * charsToUse.length)],
		).join("");
		pswd.textContent = newPswd;
		updateStrengthMeter(newPswd);
		//TODO: Add Strength update
	}
}
function updatePswdLengthShow() {
	pswdLengthShow.textContent = pswdLengthInput.value;
}
async function copyPassword() {
	try {
		await navigator.clipboard.writeText(pswd.textContent);
		copyIcon.classList.remove("fa-copy", "fa-regular");
		copyIcon.classList.add("fa-check", "fa-solid");
		copyBtn.classList.add("copied");
		setTimeout(() => {
			copyIcon.classList.remove("fa-check", "fa-solid");
			copyIcon.classList.add("fa-copy", "fa-regular");
			copyBtn.classList.remove("copied");
		}, 1000);
	} catch (error) {
		console.log(error);
	}
}

function updateStrengthMeter(password) {
	const passwordLength = password.length;
	const hasUppercase = /[A-Z]/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasNumbers = /[0-9]/.test(password);
	const hasSymbols = /[!@#$%^&*()\-_=+[\]{}|;:,.<>?]/.test(password);

	let strengthScore = 0;

	strengthScore += Math.min(passwordLength * 2, 40);

	if (hasUppercase) strengthScore += 15;
	if (hasLowercase) strengthScore += 15;
	if (hasNumbers) strengthScore += 15;
	if (hasSymbols) strengthScore += 15;

	if (passwordLength < 8) {
		strengthScore = Math.min(strengthScore, 40);
	}

	// ensure the width of the strength bar is a valid percentage
	const safeScore = Math.max(5, Math.min(100, strengthScore));
	let strengthLabel = "";
	let bgColor = "";

	if (strengthScore < 40) {
		bgColor = "#fd7983";
		strengthLabel = "Weak";
	} else if (strengthScore < 70) {
		bgColor = "#efc649";
		strengthLabel = "Medium";
	} else {
		bgColor = "#59c53b";
		strengthLabel = "Strong";
	}

	pswdStrengthIndicator.style.width = `${safeScore}%`;
	pswdStrengthIndicator.style.backgroundColor = bgColor;
	pswdStrengthText.textContent = strengthLabel;
}
function initPage() {
	generatePassword();
	updatePswdLengthShow();
}

generatePswd.addEventListener("click", generatePassword);
pswdLengthInput.addEventListener("input", updatePswdLengthShow);
copyBtn.addEventListener("click", copyPassword);
initPage();
