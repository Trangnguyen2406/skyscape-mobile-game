const q = new URLSearchParams(window.location.search).get("q") || "1";

localStorage.setItem(
    `${window.location.pathname.split("/").pop()}-question-${q}`,
    "visited"
);


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

let stationPage = "";

if (window.location.pathname.includes("cityhall-question")) {
    stationPage = "cityhall.html";
}
else if (window.location.pathname.includes("3rd-street-question")) {
    stationPage = "3rd-street.html";
}
else if (window.location.pathname.includes("8th-street-question")) {
    stationPage = "8th-street.html";
}

document.querySelectorAll(".submit-answer").forEach(button => {
    button.addEventListener("click", () => {

        if (!selectedAnswer) {
            alert("Please select an answer first.");
            return;
        }

        if (selectedAnswer.classList.contains("correct-answer")) {

            if (q === "10") {
                window.location.href = "journey-completed.html";
            } else {
                window.location.href =
                `success.html?page=${encodeURIComponent(window.location.pathname)}&q=${q}&station=${stationPage}`;
            }

        } else {

            window.location.href =
                `fail.html?page=${encodeURIComponent(window.location.pathname)}&q=${q}&station=${stationPage}`;

        }

    });
});