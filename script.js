document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const timerContainer = document.createElement("div");
    const timerTitle = document.createElement("div");
    const timerDisplay = document.createElement("div");
    let numbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    let flippedCards = [];
    let matchedPairs = 0;
    let timeLeft = 90; // 1.5 minutes in seconds
    let timerInterval = null;
    let gameStarted = false;
    let gameOver = false;

    // Create and style timer container
    timerContainer.style.cssText = "text-align: center; margin-bottom: 20px;";

    // Create and style timer title
    timerTitle.textContent = "⏳TIMER";
    timerTitle.style.cssText = "font-size: 26px; font-weight: bold; margin-bottom: 7px; color: #000000;";

    // Create and style timer display
    timerDisplay.classList.add("⏳Timer");
    timerDisplay.style.cssText = "font-size: 24px; font-weight: bold; color: #000000;";

    // Assemble timer components
    timerContainer.appendChild(timerTitle);
    timerContainer.appendChild(timerDisplay);
    board.parentNode.insertBefore(timerContainer, board);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Update timer display
    const updateTimer = () => {
        timerDisplay.textContent = formatTime(timeLeft);
    };

    // Start the timer
    const startTimer = () => {
        if (!gameStarted) {
            gameStarted = true;
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    gameOver = true;
                    alert("Time's up! Game Over!");
                    
                    // Disable all cards
                    cards.forEach(card => {
                        card.style.pointerEvents = "none";
                    });
                }
            }, 1000);
        }
    };

    numbers.sort(() => Math.random() - 0.5);

    numbers.forEach(num => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = num;
        card.dataset.value = num;
        board.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");

    // Initial timer display
    updateTimer();

    setTimeout(() => {
        cards.forEach(card => {
            card.textContent = "★";
            card.dataset.hidden = "true";
        });
    }, 5000);

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (gameOver) return;
            
            // Start timer on first card click
            startTimer();

            if (flippedCards.length < 2 && card.dataset.hidden === "true") {
                card.textContent = card.dataset.value;
                card.dataset.hidden = "false";
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    setTimeout(() => {
                        let [card1, card2] = flippedCards;

                        if (card1.dataset.value === card2.dataset.value) {
                            matchedPairs++;
                            
                            // Check for win
                            if (matchedPairs === numbers.length / 2) {
                                clearInterval(timerInterval);
                                setTimeout(() => {
                                    alert(`You win! 😚🎀🎉\nTime remaining: ${formatTime(timeLeft)}`);
                                }, 300);
                            }
                        } else {
                            card1.textContent = "★";
                            card2.textContent = "★";
                            card1.dataset.hidden = "true";
                            card2.dataset.hidden = "true";
                        }

                        flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
});