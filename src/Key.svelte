<script>
// JS code
import P5 from "p5-svelte";
let points = 1, score = 0, difficulty='mode1', word='A', currentLetterNum=0;
const sketch = (p5) => {
let answer = word; // Set the correct answer to the letter 'A'
let isCorrect = false, isWrong = false; // Flag variable to keep track if user has inputted the correct key
let successMessageTime = 0; // Keep track of when success message is shown

p5.setup = () => {
  p5.createCanvas(600, 400); // Create a canvas to display the game
  p5.textFont('Comic Sans MS');
}

 p5.draw = () => {
    p5.background(p5.color(33,8,255)); // Set the background color
  
    p5.textSize(32); // Set the text size
    p5.textAlign(p5.CENTER); // Center the text
  
  if (!isCorrect) { // If the user has not inputted the correct key
    p5.text('Press the letter: ' + answer, p5.width/2, p5.height/2); // Display the instructions
  } else { // If the user has inputted the correct key
    if (successMessageTime > 0) { // If success message is being shown
        p5.fill(0, 255, 0); // Set the fill color to green
        p5.text(`Correct! ` + answer, p5.width/2, p5.height/2); // Display feedback message
        successMessageTime--; // Decrease the timer for success message
    } else { // If success message is not being shown
      p5.text('Click anywhere to go to proceed', p5.width/2, p5.height/2); // Display the next instructions
    }
  }
  
  if (isCorrect && p5.mouseIsPressed) { // Check if the user has clicked the mouse
    answer = String.fromCharCode(p5.random(65, 90)); // Generate a new random answer in uppercase
    if(isCorrect && !isWrong){ /*So if when user gets it wrong then corrects the error lies unrewarded*/ score += points}
    else{
      isWrong = false
    }
    isCorrect = false; // Reset the flag variable
  } else if (p5.keyIsPressed && (p5.key.toUpperCase() === answer || p5.key.toLowerCase() === answer)) { // Check if the user has pressed the correct key (ignoring case)
    if(isCorrect) return; //So the game does not display 'correct' when the click anywhere message is still up
    isCorrect = true; // Set the flag variable to true
    successMessageTime = 60; // Set the timer for success message to 60 frames (1 second)
  } else if (p5.keyIsPressed) { // Check if the user has pressed any key
    if (isCorrect) return; // So the user does not accidentally press a key while he got the answer correct less than 60 frames (1 second) before
    p5.fill(255, 0, 0); // Set the fill color to red
    isCorrect = false;
    isWrong = true
    p5.text(`Incorrect -${points}`, p5.width/2, p5.height/2 + 50); // Display feedback message
    successMessageTime = 0; // Reset the timer for success message
    if(score > points - 1)  score -= points
  }
}

p5.mouseClicked = () => {
  if (!isCorrect) { // Only reset the game if the user has not inputted the correct key
    answer = String.fromCharCode(p5.random(65, 90)); // Generate a new random answer in uppercase
    successMessageTime = 0; // Reset the timer for success message
  }
}
  };

    </script>
<div class="touch-none">
  <div>
    <P5 {sketch} />
  </div>
  <p>{score}</p>
  <div class="difficulty">
    <div class="easy">
      <button class="easy {difficulty}" on:click={function(){difficulty='mode1'}}>easy</button>
    </div>
    <div class="hard">
      <button class="hard {difficulty}" on:click={function(){difficulty='mode2'}}>hard</button>
    </div>
  </div>
</div>
<style>
  div.easy, div.hard{
    display: inline;
  }
  button.easy.mode1{
    background-color: rgb(84, 84, 255);
  }
  button.hard.mode2{
    background-color: rgb(84, 84, 255);
  }
  button{
    border-radius: 5px;
  }
</style>