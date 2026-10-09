const generate_button = document.getElementById("generate-button");
const palette_container = document.getElementById("all-palette-container");

function copy_to_clipboard(event) {
	const hex_div = event.currentTarget.querySelector(".palette-color-hex");
	const symbol_div = event.currentTarget.querySelector(".color-palette-symbol");
	navigator.clipboard.writeText(hex_div.innerText);
	symbol_div.classList.remove("fa-copy");
	symbol_div.classList.add("fa-check");
	setTimeout(() => {
		symbol_div.classList.remove("fa-check");
		symbol_div.classList.add("fa-copy");
	}, 1000);
}

function make_palette_div() {
	const new_div = document.createElement("div");
	const color_div = document.createElement("div");
	const bottom_section_div = document.createElement("div");
	const hex_div = document.createElement("div");
	const symbol_div = document.createElement("i");
	let color_str = "#";
	for (let i = 0; i < 3; i++) {
		color_str += Math.floor(Math.random() * 256)
			.toString(16)
			.padStart(2, "0");
	}
	color_str = color_str.toUpperCase();
	color_div.style.backgroundColor = color_str;
	hex_div.textContent = color_str;
	color_div.classList.add("palette-color-div");
	new_div.classList.add("palette-overall-div");
	bottom_section_div.classList.add("palette-bottom-section");
	hex_div.classList.add("palette-color-hex");
	symbol_div.classList.add("fa-solid", "fa-copy", "color-palette-symbol");
	new_div.appendChild(color_div);
	bottom_section_div.appendChild(hex_div);
	bottom_section_div.appendChild(symbol_div);
	new_div.appendChild(bottom_section_div);

	new_div.addEventListener("click", copy_to_clipboard);
	return new_div;
}
function make_full_palette() {
	palette_container.innerHTML = "";
	for (let j = 0; j < 6; j++) {
		palette_container.appendChild(make_palette_div());
	}
}

generate_button.addEventListener("click", make_full_palette);

make_full_palette();
