let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

const element = document.getElementById("level-title");
element.addEventListener("click", myFunction);

function myFunction() {
  if (!started) {

    // The h1 title startssout saying "Presshere to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

// $(document).keydown(function() {
//   if (!started) {
//
//     // The h1 title startssout saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text(`Game Over!!!  Press here to Restart`);
    $(".score").text(`Your score: ${level === 0 ? 0 : level - 1}`);
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);



    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor((Math.random() * 4));
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
