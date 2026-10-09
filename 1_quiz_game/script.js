const questions = [
	{
		question: "What is 2+2?",
		options: ["2", "3", "4", "5"],
		correct_option: 2,
	},
	{
		question: "What is 1+2?",
		options: ["2", "3", "4", "5"],
		correct_option: 1,
	},
	{
		question: "What is 3+2?",
		options: ["2", "3", "4", "5"],
		correct_option: 3,
	},
	{
		question: "What is 3+3?",
		options: ["6", "3", "4", "5"],
		correct_option: 0,
	},
	{
		question: "What is 4+3?",
		options: ["6", "3", "7", "5"],
		correct_option: 2,
	},
];
const selected_indices = [];
const feedback_notes = [
	"Avoiding correct answers?",
	"You even trying?",
	"Pathetic",
	"Git Good",
	"Not Bad",
	"Cheating?",
];

function set_question_text(question_text) {
	document.querySelector("h2.question-text").innerText = question_text;
}

function set_options(options) {
	for (let i = 0; i < 4; i++) {
		const option_button = document.getElementById(`option-${i}`);
		option_button.style.border = "2.0px solid bisque";
		option_button.style.backgroundColor = "beige";
		option_button.style.color = "black";
		// option_button.style.backgroundColor = "white";
		option_button.innerText = options[i];
		option_button.disabled = false;
	}
}
function disable_options() {
	for (let i = 0; i < 4; i++) {
		document.getElementById(`option-${i}`).disabled = true;
	}
}

function set_question_number(question_number) {
	document.querySelector(".question-section span.question-number").innerText =
		question_number;
}
function auto_set_question_number() {
	document.querySelector(".question-section span.question-number").innerText =
		selected_indices.length;
}

function increment_question_number() {
	const q_number = Number(
		document.querySelector(".question-section span.question-number").innerText,
	);
	document.querySelector(".question-section span.score-value").innerText =
		q_number + 1;
}

function set_score(score) {
	document.querySelector(".question-section span.score-value").innerText =
		score;
}
function increment_score() {
	const score_val = Number(
		document.querySelector(".question-section span.score-value").innerText,
	);
	document.querySelector(".question-section span.score-value").innerText =
		score_val + 1;
}

function set_progress_bar(perc) {
	document.querySelector("div.progress-bar").style.gridTemplateColumns =
		`${perc}% 1fr`;
}
function auto_set_progress_bar() {
	document.querySelector("div.progress-bar").style.gridTemplateColumns =
		`${20 * selected_indices.length}% 1fr`;
}

function start_quiz(section_name) {
	const question_index = Math.floor(Math.random() * questions.length);
	const question_obj = questions[question_index];
	start_section = document.querySelector(section_name);
	question_section = document.querySelector("section.question-section");
	selected_indices.length = 0;

	set_question_text(question_obj["question"]);
	set_options(question_obj["options"]);
	set_score(0);
	auto_set_progress_bar();
	selected_indices.push(question_index);
	auto_set_question_number();

	start_section.style.display = "none";
	question_section.style.display = "grid";
}

function update_question_section(question_obj) {
	set_question_text(question_obj["question"]);
	set_options(question_obj["options"]);
	auto_set_question_number();
}

function update_result_section() {
	restart_section = document.querySelector("section.result-section");
	question_section = document.querySelector("section.question-section");

	restart_section.style.display = "grid";
	question_section.style.display = "none";
}

function select_option(option) {
	const cur_question = questions[selected_indices.at(-1)];
	auto_set_progress_bar();
	document.getElementById(`option-${option}`).blur();
	if (Number(option) === cur_question["correct_option"]) increment_score();
	else {
		const incor_opt = document.getElementById(`option-${option}`);
		incor_opt.style.border = "2.0px solid red";
		incor_opt.style.backgroundColor = "salmon";
		incor_opt.style.color = "red";
	}
	const cor_opt = document.getElementById(
		`option-${cur_question["correct_option"]}`,
	);
	cor_opt.style.border = "2.0px solid green";
	cor_opt.style.backgroundColor = "lightgreen";
	cor_opt.style.color = "green";

	disable_options();
	if (selected_indices.length < 5) {
		const remaining_indices = [];
		for (let i = 0; i < questions.length; i++) {
			if (!selected_indices.includes(i)) {
				remaining_indices.push(i);
			}
		}
		const question_index =
			remaining_indices[Math.floor(Math.random() * remaining_indices.length)];
		const question_obj = questions[question_index];
		selected_indices.push(question_index);
		setTimeout(update_question_section, 2000, question_obj);
	} else {
		const score = Number(
			document.querySelector(".question-section .score-value").innerText,
		);
		document.querySelector("h2.result-comment").innerText =
			feedback_notes[score];
		document.querySelector(".result-section .score-value").innerText = score;
		setTimeout(update_result_section, 2000);
	}
}
