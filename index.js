var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var gameCounter = 0;
var gameMode = "";
$(".container").hide();
var userCounter = 0;

function nextSequence(){
  userClickedPattern = [];
  $(".container").show();

  // Title

  $("#level-title").text(level);
  level++;

  // Generate random color

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  // Add to the random pattern

  gamePattern.push(randomChosenColor);
  if(gameMode==="easy") {
    console.log("hey");
    easyMode();
  }

  if(gameMode==="hard") {
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

}

// User pattern

  $(".btn").click(function() {

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length);

  });

  // Play audio

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

  // Flash animation

  function animatePress(currentColor) {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
      }, 70);
  }

  // Start Over

  function startOver() {
    level = 1;
    gamePattern = [];
  }

  // Check the answer

function checkAnswer(currentLevel) {
    currentLevel = currentLevel-1;
    userCounter++;
    $("#user-counter").text(userCounter);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          userCounter = 0;
          $("#user-counter").text(userCounter);
          nextSequence();
        }, 1000);
      }

    }else {
      userCounter = 0;
      $(".container").hide();
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 100);
      $("#level-title").text("Perdiste en el nivel " + (level-1));
      $(".difficulty").show();
      startOver();
    }

}


function easyMode(){
  setTimeout(function () {
    console.log(gameCounter);
    $("#" + gamePattern[gameCounter]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[gameCounter]);
    gameCounter++;
    if (gameCounter < gamePattern.length) {
      easyMode();
    } else {
      gameCounter = 0;
    }
  }, 300);
}


$("#facil").click(function() {
  gameMode = "easy";
  $(".difficulty").hide();
  nextSequence()
});

$("#dificil").click(function() {
  gameMode = "hard";
  $(".difficulty").hide();
  nextSequence();
});
