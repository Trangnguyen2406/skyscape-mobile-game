document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const q = Number(params.get("q")) || 1;
    const nextQ = params.get("nextQ");
    const page = params.get("page");
    const station = params.get("station");

    // ==========================================
    // 1. QUESTION PAGE LOGIC
    // ==========================================
    if (document.querySelector(".question-container")) {
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

        // Track selected answer
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

        // Determine which station page and consistent page key to use
        let stationPage = "";
        let questionPage = window.location.pathname.split("/").pop();

        if (window.location.pathname.includes("cityhall-question")) {
            stationPage = "cityhall.html";
            questionPage = "cityhall-question.html";
        } else if (window.location.pathname.includes("3rd-street-question")) {
            stationPage = "3rd-street.html";
            questionPage = "3rd-street-question.html";
        } else if (window.location.pathname.includes("8th-street-question")) {
            stationPage = "8th-street.html";
            questionPage = "8th-street-question.html";
        }

        // Count total questions dynamically (defaults to 10 if none found)
        const totalQuestions = document.querySelectorAll(".question-container").length || 10;

        // Find the next uncompleted question (1 to totalQuestions), or return null if all are done
        function getNextUncompletedQuestion() {
            for (let i = 1; i <= totalQuestions; i++) {
                if (localStorage.getItem(`${questionPage}-question-${i}`) !== "completed") {
                    return i;
                }
            }
            return null;
        }

        // Handle submit
        document.querySelectorAll(".submit-answer").forEach(button => {
            button.addEventListener("click", () => {
                if (!selectedAnswer) {
                    alert("Please select an answer first.");
                    return;
                }

                if (selectedAnswer.classList.contains("correct-answer")) {
                    // Mark this question as completed
                    localStorage.setItem(`${questionPage}-question-${q}`, "completed");

                    // Check if there is another uncompleted question left
                    const nextUncompleted = getNextUncompletedQuestion();

                    if (nextUncompleted === null) {
                        window.location.href = "journey-completed.html";
                    } else {
                        window.location.href =
                            `success.html?page=${encodeURIComponent(window.location.pathname)}&q=${q}&nextQ=${nextUncompleted}&station=${stationPage}`;
                    }
                } else {
                    window.location.href =
                        `fail.html?page=${encodeURIComponent(window.location.pathname)}&q=${q}&station=${stationPage}`;
                }
            });
        });
    }

    // ==========================================
    // 2. SUCCESS & FAIL PAGE BUTTONS
    // ==========================================
    document.querySelectorAll("button, a").forEach(el => {
        const text = el.textContent.trim().toLowerCase();

        // "Next Question" on success.html (jumps to the next uncompleted question)
        if (text === "next question") {
            if (!nextQ) {
                el.style.display = "none";
            } else {
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (page) window.location.href = `${page}?q=${nextQ}`;
                });
            }
        }

        // "Try Again" on fail.html (returns to the exact same question)
        if (text === "try again") {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                if (page) window.location.href = `${page}?q=${q}`;
            });
        }

        // "Explore other locations" on both success.html and fail.html
        if (text === "explore other locations") {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                if (station) window.location.href = station;
            });
        }
    });
});
