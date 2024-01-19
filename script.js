document.addEventListener("DOMContentLoaded", function () {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabetDisplay = document.getElementById("alphabet-display");
    const userInput = document.getElementById("user-input");
    const startButton = document.getElementById("start-button");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result");
    
    // Variable to store the current position in the alphabet
    let currentPosition = 0;
    
    startButton.addEventListener("click", startTest);

    function startTest() {
        const shuffledAlphabet = shuffleAlphabet(alphabet);
        alphabetDisplay.textContent = shuffledAlphabet;
        userInput.value = "";
        userInput.disabled = false;
        userInput.focus();
        startButton.style.display = "none";
        resultContainer.style.display = "none";
        userInput.addEventListener("input", checkTypingSpeed);
        // Initialize current position
        currentPosition = 0;
    }

    function shuffleAlphabet(alphabet) {
        return alphabet.split('').sort(function() { return 0.5 - Math.random() }).join('');
    }

    function checkTypingSpeed() {
        const userTyped = userInput.value;
        const shuffledAlphabet = alphabetDisplay.textContent;
        
        // Ensure user input does not exceed the shuffled alphabet length
        if (userTyped.length > shuffledAlphabet.length) {
            userInput.value = userTyped.slice(0, shuffledAlphabet.length);
        }
        
        // Check if the current character matches the expected character
        if (userTyped[currentPosition] === shuffledAlphabet[currentPosition]) {
            currentPosition++;
        } else {
            // Reset user input and position if there's a mistake
            userInput.value = "";
            currentPosition = 0;
        }

        // If the user has completed typing the shuffled alphabet
        if (currentPosition === shuffledAlphabet.length) {
            const timeTaken = new Date().getTime() - startTime;
            const charactersTyped = userTyped.length;
            const typingSpeed = (charactersTyped / (timeTaken / 1000)).toFixed(2);

            resultText.textContent = `Typing Speed: ${typingSpeed} characters per second`;
            resultContainer.style.display = "block";

            userInput.removeEventListener("input", checkTypingSpeed);
            userInput.disabled = true;
            startButton.style.display = "block";
            currentPosition = 0;
            alphabetDisplay.textContent = "";
        }
    }
});


