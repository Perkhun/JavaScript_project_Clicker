document.addEventListener("DOMContentLoaded", function () {
  const clickButton = document.getElementById("click-button");
  const scoreDisplay = document.getElementById("score");
  const timeLeftDisplay = document.getElementById("time-left");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const result = document.querySelector("#result");
  const selectTime = document.getElementById("select-time");
  const backgroundMusic = document.getElementById("background-music");

  let score = 0;
  let initialTime = 10;
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

  // Таймер гри
  function countdown() {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clickButton.removeEventListener("click", handleClick);
      clearInterval(timerInterval);
      backgroundMusic.pause();
      result.innerHTML = `Game over! Your score: ${score}`;
      result.style.display = "block";
    }
  }

  // Запуск таймера
  startButton.addEventListener("click", function () {
    if (!timerInterval) {
      timerInterval = setInterval(countdown, 1000);
      clickButton.addEventListener("click", handleClick);
      backgroundMusic.play();
    }
  });

  restartButton.addEventListener("click", function () {
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
    backgroundMusic.play();
  });

  //Cелект
  selectTime.addEventListener("change", function () {
    initialTime = parseInt(selectTime.value);
    timeLeft = initialTime;
    score = 0;
    updateDisplay();
  });
});
