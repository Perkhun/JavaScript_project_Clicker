document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById("click-button");
    const scoreDisplay = document.getElementById("score");
    const timeLeftDisplay = document.getElementById("time-left");
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    let score = 0;
    const initialTime = 5;
    let timeLeft = initialTime;
    let timerInterval;

    // Оновлення відображення очок та часу
    function updateDisplay() {
        scoreDisplay.textContent = `Score: ${score}`;
        timeLeftDisplay.textContent = `Time left: ${timeLeft}`;
    }

    // Функція обробки кліку
    function handleClick() {
        if (timeLeft > 0) {
            score++;
            updateDisplay();
        }
    }

    // Обробник натискання на кнопку
    clickButton.addEventListener("click", handleClick);

    // Таймер гри
    function countdown() {
        timeLeft--;
        updateDisplay();
    
        if (timeLeft <= 0) {
            clickButton.removeEventListener("click", handleClick);
            clearInterval(timerInterval);
            alert(`Game over! Your score: ${score}`);
        }
    }

    // Запуск таймера
    startButton.addEventListener('click', function() {
        if (!timerInterval) {
            timerInterval = setInterval(countdown, 1000);
            clickButton.addEventListener("click", handleClick);
        }
    }); 
    
    restartButton.addEventListener('click', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = undefined;
        }
        
        timeLeft = initialTime;
        score = 0;
        updateDisplay();
        clickButton.addEventListener("click", handleClick);
        
        // Запуск таймера після рестарту
        timerInterval = setInterval(countdown, 1000);
    });
});
