'use strict';

let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let levelChecker = 0;
let level = 0;
let counterAnswerCheck = 0;
let onOff = true;

//to start the game
let checker = false;

//to start a sequence function
let nextSequence = function(){
    level ++;
    let randomNum = Math.trunc(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $("#"+""+randomChosenColour+"").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").html("Level "+level+"");

    console.log(`next game pattern ${gamePattern}`);

}

// to check the answer function
let checkAnswer = function(color){
    if(color === gamePattern[counterAnswerCheck]){
        counterAnswerCheck++;
        console.log(counterAnswerCheck);
    } else {
        console.log('wrong color');
        console.log(counterAnswerCheck);
        onOff = false;
        checker = false;
        gameOver();
    }

    if(userClickedPattern.length === gamePattern.length){
        console.log('success');
        counterAnswerCheck = 0;
    }
}

//Clicking the button
$(".btn").on("click",function(event){
    levelChecker ++;
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    $("."+""+userChosenColor+"").addClass("pressed");
    setTimeout(function(){
        $("."+""+userChosenColor+"").removeClass("pressed")
    },100)

    console.log(userClickedPattern);

   
    checkAnswer(userChosenColor);
    //click on button counter
    
    if(levelChecker === level && onOff === true){
        nextSequence();
        levelChecker = 0;
        userClickedPattern.length = 0; 
    } else{
        // console.log('bruh');
    }

})

//function to play the sound
let playSound = function(location){
    let soundColor = new Audio('sounds/'+location+'.mp3');
    soundColor.play();
    soundColor.volume = 0.1;
}



let startGame = $(document).on("keypress",function(event){
    
    if(checker != true){
        checker = true;
        onOff = true;
        nextSequence(); 
    }
}); 

//game over screen
let gameOver = function(){
    $("body").addClass("game-over");
    setTimeout(function(){
       $("body").removeClass("game-over"); 
    },100);

    let gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    gameOverSound.volume = 0.1;

    gamePattern = [];
    userClickedPattern = [];
    levelChecker = 0;
    level = 0;
    counterAnswerCheck = 0;

    $("#level-title").text("Game Over, Press A Key To Restart"); 
}





    


        







