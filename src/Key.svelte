<script>
// JS code
import P5 from "p5-svelte";
const sketch = (p5) => {
let answer = 'A'; // Set the correct answer to the letter 'A'
let isCorrect = false; // Flag variable to keep track if user has inputted the correct key
let successMessageTime = 0; // Keep track of when success message is shown

p5.setup = () => {
  p5.createCanvas(600, 600); // Create a canvas to display the game
  p5.textFont('Comic Sans MS');
}

 p5.draw = () => {
    p5.background(p5.color(33,8,255)); // Set the background color
  
    p5.textSize(32); // Set the text size
    p5.textAlign(p5.CENTER); // Center the text
  
  if (!isCorrect) { // If the user has not inputted the correct key
    p5.text('Press the letter ' + answer, p5.width/2, p5.height/2); // Display the instructions
  } else { // If the user has inputted the correct key
    if (successMessageTime > 0) { // If success message is being shown
        p5.fill(0, 255, 0); // Set the fill color to green
        p5.text('You pressed the correct key!', p5.width/2, p5.height/2 + 50); // Display feedback message
      successMessageTime--; // Decrease the timer for success message
    } else { // If success message is not being shown
        p5.text('Click anywhere to go to the next letter', p5.width/2, p5.height/2); // Display the next instructions
    }
  }
  
  if (isCorrect && p5.mouseIsPressed) { // Check if the user has clicked the mouse
    isCorrect = false; // Reset the flag variable
    answer = String.fromCharCode(p5.random(65, 90)); // Generate a new random answer in uppercase
  } else if (p5.keyIsPressed && (p5.key.toUpperCase() === answer || p5.key.toLowerCase() === answer)) { // Check if the user has pressed the correct key (ignoring case)
    isCorrect = true; // Set the flag variable to true
    successMessageTime = 60; // Set the timer for success message to 60 frames (1 second)
  } else if (p5.keyIsPressed) { // Check if the user has pressed any key
    p5.fill(255, 0, 0); // Set the fill color to red
    p5.text('Wrong key, please try again', p5.width/2, p5.height/2 + 50); // Display feedback message
    successMessageTime = 0; // Reset the timer for success message
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



<main>
<!-- Html -->

    </main>