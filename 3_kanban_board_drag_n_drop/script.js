function dragStartHandler(ev) {
	ev.dataTransfer.setData("text/plain", ev.target.textContent);
	ev.dataTransfer.effectAllowed = "move";
	ev.target.classList.add("moving");
	ev.target.classList.remove("normal");
}
function dragEndHandler(ev) {
	// ev.target.textContent = ev.dataTransfer.dropEffect;
	if (ev.dataTransfer.dropEffect == "move") ev.target.remove();
	else {
		ev.classList.remove("moving");
		ev.target.classList.add("normal");
	}
}
function dragOverHandler(ev) {
	if (
		!(
			ev.target.classList.contains("moving") //||
			// ev.target.classList.contains("temp")
		)
	) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
	}
}
function dropHandler(ev) {
	const new_p = document.createElement("p");
	new_p.textContent = ev.dataTransfer.getData("text/plain");
	new_p.classList.add("kanban-item", "normal");
	new_p.draggable = true;
	new_p.addEventListener("dragstart", dragStartHandler);
	new_p.addEventListener("dragend", dragEndHandler);
	if (ev.target.classList.contains("kanban-item-place")) {
		ev.target.appendChild(new_p);
	} else if (ev.target.classList.contains("kanban-item")) {
		ev.target.parentNode.insertBefore(new_p, ev.target);
		dragLeaveHandler(ev);
		// deleteTempRemoveClass(ev);
	}
}
function dragEnterHandler(ev) {
	// document.body.appendChild(
	// 	document.createTextNode("enter" + ev.target.classList),
	// );
	// if (ev.target.classList.contains("insert-before")) {
	if (ev.target.classList.contains("normal")) {
		// document.body.appendChild(
		// 	document.createTextNode("hehe" + ev.target.classList),
		// );
		const new_p = document.createElement("p");
		new_p.classList.add("kanban-item", "temp");
		new_p.addEventListener("dragleave", dragLeaveHandler);
		// new_p.addEventListener("dragenter", dragEnterHandler);
		ev.target.parentNode.insertBefore(new_p, ev.target);
		ev.target.classList.add("insert-before");
		ev.target.classList.remove("normal");
	}
}
// function deleteTempRemoveClass(ev) {
// 	if (ev.target.classList.contains("temp")) {
// 		const parentNode = ev.target.parentNode;
// 		const temp_p = parentNode.querySelector(".temp");
// 		const next_node = temp_p.nextSibling;
// 		next_node.classList.remove("insert-before");
// 		next_node.classList.add("normal");
// 		temp_p.remove();
// 	}
// }
function dragLeaveHandler(ev) {
	// document.body.appendChild(document.createTextNode(ev.target.classList));
	if (ev.target.classList.contains("temp")) {
		// document.body.appendChild(
		// 	"temp" + document.createTextNode(ev.target.classList),
		// );
		const parentNode = ev.target.parentNode;
		const temp_p = parentNode.querySelector(".temp");
		const next_node = temp_p.nextSibling;
		next_node.classList.remove("insert-before");
		next_node.classList.add("normal");
		temp_p.remove();
	}
	//    else if (!ev.target.classList.contains("insert-before")) {
	// 	document.body.appendChild(document.createTextNode(ev.target.classList));
	// 	const parentNode = ev.target.parentNode;
	// 	const temp_p = parentNode.querySelector(".temp");
	// 	temp_p.remove();
	// }
	// }
}

document.querySelectorAll(".kanban-item").forEach((item) => {
	item.addEventListener("dragstart", dragStartHandler);
	item.addEventListener("dragend", dragEndHandler);
	item.addEventListener("dragenter", dragEnterHandler);
	item.addEventListener("dragleave", dragLeaveHandler);
});

document.querySelectorAll(".kanban-item-place").forEach((item) => {
	item.addEventListener("dragover", dragOverHandler);
	item.addEventListener("drop", dropHandler);
});
