let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let coin = document.getElementById("coin");
let scoreDisplay = document.getElementById("score");
let score = 0;
let jumping = false;

function jump() {
  if (jumping) return;
  jumping = true;
  let jumpHeight = 0;
  let up = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(up);
      let down = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(down);
          jumping = false;
        } else {
          jumpHeight -= 5;
          character.style.bottom = 100 + jumpHeight + "px";
        }
      }, 20);
    } else {
      jumpHeight += 5;
      character.style.bottom = 100 + jumpHeight + "px";
    }
  }, 20);
}

document.body.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});
document.body.addEventListener("touchstart", jump);

function checkCollision(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

setInterval(() => {
  if (checkCollision(character, obstacle)) {
    alert("Game Over! Final Score: " + score);
    location.reload();
  }
  if (checkCollision(character, coin)) {
    score += 1;
    scoreDisplay.innerText = "Score: " + score;
    coin.style.right = "-100px"; // Reset coin
  }
}, 100);
