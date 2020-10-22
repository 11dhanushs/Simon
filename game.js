var buttonColours = ["red","blue","green","yellow"];
gamePattern =[];
userClickedPattern = [];
var start = false;
var level = 0;

// Start the game on a valid key enter only
$(document).on("keydown",function(){
    if(!start){
      start = true;
      nextSequence();
    }
  });

// Sequence Generator
function nextSequence(){
  userClickedPattern = [];
  level+=1;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// Playing the respective audio
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Functioning on selecting a color
$(".btn").click(function(){
  if(start){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}
});


// Animate buttons on press
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// Check if the sequence selected is correct
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    console.log("success");
  }
  else{
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, Press any key to play again");
    startOver();
  }
  if(userClickedPattern.length==gamePattern.length){
    console.log("finished");
    setTimeout(function(){
      nextSequence();
    },500);
  }
}
// Restart the game
function startOver(){
  gamePattern = [];
  start = false;
  level = 0;
}
