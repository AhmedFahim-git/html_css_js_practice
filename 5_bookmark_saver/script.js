const bmName = document.getElementById("bookmark-name");
const bmUrl = document.getElementById("bookmark-url");
const bmAdd = document.getElementById("bookmark-add");
const bmList = document.querySelector("ul");
const bmForm = document.querySelector("form");

function removeItem(ev) {
	const id = Number(ev.target.getAttribute("item-id"));
	const bmArray = JSON.parse(localStorage.getItem("bmArray")) || [];
	let idRemove;
	for (let i = 0; i < bmArray.length; i++) {
		if (id === bmArray[i]["id"]) {
			idRemove = i;
			break;
		}
	}
	if (!(idRemove == null)) {
		bmArray.splice(idRemove, 1);
		localStorage.setItem("bmArray", JSON.stringify(bmArray));
		createFullList(bmArray);
	} else console.log("ID to remove not found");
}

function createLI(itemJson) {
	const listItem = document.createElement("li");
	const anchor = document.createElement("a");
	const btn = document.createElement("button");

	anchor.href = itemJson["url"];
	anchor.target = "_blank";
	anchor.textContent = itemJson["name"];
	btn.type = "button";
	btn.textContent = "Remove";
	btn.setAttribute("item-id", itemJson["id"]);
	btn.addEventListener("click", removeItem);

	listItem.appendChild(anchor);
	listItem.appendChild(btn);
	return listItem;
}

function createFullList(jsonList) {
	[...bmList.children].forEach((item) => item.remove());
	for (const item of jsonList) bmList.appendChild(createLI(item));
}

function init() {
	const bmArray = JSON.parse(localStorage.getItem("bmArray")) || [];
	createFullList(bmArray);
}

bmForm.addEventListener("submit", (ev) => {
	ev.preventDefault();
	const name = bmName.value.trim();
	const url = bmUrl.value.trim();
	if (!(name.length === 0 && url.length === 0)) {
		const bmArray = JSON.parse(localStorage.getItem("bmArray")) || [];
		const newItem = { id: Date.now(), name, url };
		bmArray.push(newItem);
		bmList.appendChild(createLI(newItem));
		localStorage.setItem("bmArray", JSON.stringify(bmArray));
		ev.target.reset();
	}
});

init();
