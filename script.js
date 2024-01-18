document.addEventListener("DOMContentLoaded", function () {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabetDisplay = document.getElementById("alphabet-display");
    const userInput = document.getElementById("user-input");
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", startTest);

    function startTest() {
        const shuffledAlphabet = shuffleAlphabet(alphabet);
        alphabetDisplay.textContent = shuffledAlphabet;
        userInput.value = "";
        userInput.disabled = false;
        userInput.focus();
        startButton.style.display = "none";
        userInput.addEventListener("input", checkTypingSpeed);
    }

    function shuffleAlphabet(alphabet) {
        return alphabet.split('').sort(function() { return 0.5 - Math.random() }).join('');
    }

    let startTime;

    function checkTypingSpeed() {
        if (!startTime) {
            startTime = new Date().getTime();
        }

        const userTyped = userInput.value;
        const shuffledAlphabet = alphabetDisplay.textContent;

        if (userTyped === shuffledAlphabet) {
            const timeTaken = new Date().getTime() - startTime;
            const charactersTyped = userTyped.length;
            const typingSpeed = (charactersTyped / (timeTaken / 1000)).toFixed(2);

            alert(`Typing Speed: ${typingSpeed} characters per second`);

            userInput.removeEventListener("input", checkTypingSpeed);
            userInput.disabled = true;
            startButton.style.display = "block";
            startTime = null;
            alphabetDisplay.textContent = "";
        }
    }
});
