const overallBalance = document.getElementById("overall-balance-value");
const incomeValue = document.getElementById("income-value");
const expenseValue = document.getElementById("expense-value");
const descInput = document.getElementById("transaction-description");
const amountInput = document.getElementById("transaction-amount");
const docTransList = document.getElementById("transaction-list");
const formSubmit = document.getElementById("form-submit-btn");

const currencyFormatter = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

document.querySelector("form").addEventListener("submit", (ev) => {
	ev.preventDefault();
});

function init() {
	const transList = JSON.parse(localStorage.getItem("transList")) ?? [];
	updateAll(transList);
}

function updateAll(itemList = []) {
	let income = 0;
	let expense = 0;

	docTransList
		.querySelectorAll(".transaction-item")
		.forEach((item) => item.remove());

	for (let i = itemList.length - 1; i >= 0; i--) {
		const amount = itemList[i]["amount"];
		docTransList.appendChild(makeTransitem(itemList[i]));
		if (amount < 0) expense -= amount;
		else income += amount;
	}
	incomeValue.textContent = currencyFormatter.format(income);
	expenseValue.textContent = currencyFormatter.format(expense);
	overallBalance.textContent = currencyFormatter.format(income - expense);
}

function removeItemBtnHandler(ev) {
	const transList = JSON.parse(localStorage.getItem("transList")) ?? [];
	const id = Number(
		ev.currentTarget.parentElement.parentElement.getAttribute("item-id"),
	);
	let indexDelete;
	for (let i = 0; i < transList.length; i++)
		if (transList[i]["id"] === id) {
			indexDelete = i;
			break;
		}

	if (!(indexDelete == null)) {
		transList.splice(indexDelete, 1);
	}

	localStorage.setItem("transList", JSON.stringify(transList));
	updateAll(transList);
}

function makeTransitem(itemJson) {
	const transItem = document.createElement("li");
	const transDesc = document.createElement("span");
	const transAmount = document.createElement("span");
	const borderHandle = document.createElement("div");
	const outerBorder = document.createElement("div");
	const innerBorder = document.createElement("div");
	const removeBtn = document.createElement("button");
	const xMark = document.createElement("i");

	transItem.classList.add("transaction-item");
	transItem.setAttribute("item-id", itemJson["id"]);
	transDesc.classList.add("transaction-description");
	transAmount.classList.add("transaction-amount");
	xMark.classList.add("fa-solid", "fa-xmark");
	removeBtn.type = "button";
	removeBtn.classList.add("item-remove-button");
	borderHandle.classList.add("border-handle");
	innerBorder.classList.add("transaction-border-inner");
	outerBorder.classList.add(
		"transaction-border-outer",
		itemJson["amount"] < 0 ? "expense" : "income",
	);

	transDesc.textContent = itemJson["desc"];
	transAmount.textContent = currencyFormatter.format(itemJson["amount"]);

	removeBtn.addEventListener("click", removeItemBtnHandler);

	transItem.appendChild(transDesc);
	transItem.appendChild(transAmount);
	// transItem.appendChild(removeBtn);
	removeBtn.appendChild(xMark);
	borderHandle.appendChild(removeBtn);
	borderHandle.appendChild(innerBorder);
	borderHandle.appendChild(outerBorder);
	transItem.appendChild(borderHandle);
	// transItem.appendChild(outerBorder);
	// transItem.appendChild(innerBorder);

	return transItem;
}

formSubmit.addEventListener("click", (ev) => {
	const desc = descInput.value || null;
	const amount = Number(amountInput.value || NaN);
	if (!(desc == null || isNaN(amount))) {
		let id = 0;
		const transList = JSON.parse(localStorage.getItem("transList")) ?? [];
		if (transList.length > 0) {
			id = transList.at(-1)["id"] + 1;
		}
		transList.push({ id: id, desc: desc, amount: amount });
		localStorage.setItem("transList", JSON.stringify(transList));

		descInput.value = "";
		amountInput.value = "";
		ev.preventDefault();
		updateAll(transList);
	} else console.log("Description or Amount not correct");
});

init();
