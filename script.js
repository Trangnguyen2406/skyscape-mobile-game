const q = new URLSearchParams(window.location.search).get("q") || "1";

// Hide all questions
document.querySelectorAll(".question-container").forEach(question => {
    question.style.display = "none";
});

// Hide all images
document.querySelectorAll(".question-image").forEach(img => {
    img.style.display = "none";
});

// Show matching question
const question = document.getElementById(`question-${q}`);
if (question) {
    question.style.display = "flex";
}

// Show matching image
const image = document.getElementById(`question-${q}-img`);
if (image) {
    image.style.display = "block";
}

// Update heading
const title = document.getElementById("question-title");
if (title) {
    title.textContent = `Question ${q}`;
}

let selectedAnswer = null;

document.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".answer").forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedAnswer = button;
    });
});

document.querySelectorAll(".submit-answer").forEach(button => {
    button.addEventListener("click", () => {

        if (!selectedAnswer) {
            alert("Please select an answer first.");
            return;
        }

        if (selectedAnswer.classList.contains("correct-answer")) {

            window.location.href = "success.html";

        } else {

            window.location.href =
                `fail.html?page=${encodeURIComponent(window.location.pathname)}&q=${q}`;

        }
    });
});