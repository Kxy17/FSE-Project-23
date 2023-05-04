<script>
  import P5 from "p5-svelte";
  import { time } from "./Stopwatch";
  import { start } from "./Stopwatch";
  import { pause } from "./Stopwatch";
  import { formatTime } from "./Stopwatch";
  let word = "";
  let score = 0;
  let wrong = false;
  //keyboard; each row in an array
  let keyboard = {
    keys: [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ],
  };
  //number of words until finish
  let wordsLeft = 10;
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
    };
    p.draw = () => {
      p.background("#E9DABC");
      p.textAlign(p.CENTER);
      p.textSize(16);
      p.text(`Elapsed: ${formatTime($time)}`, p.width / 2, p.height / 2 - 150);
      p.text(`Score: ${score}`, p.width / 2, p.height / 2 + 50);
      p.text(`Words left: ${wordsLeft}`, p.width / 2, p.height / 2 + 150);
      //win case
      if (wordsLeft == 0) {
        p.textSize(25);
        pause();
        p.text(
          `Solid! You finished with:${score} points.`,
          p.width / 2,
          p.height / 2
        );
        p.text(`In ${formatTime($time)}`, p.width / 2, p.height / 2 + 25);
        localStorage.setItem(
          "points",
          (parseFloat(localStorage.getItem("points")) + 10).toString()
        );
      } else {
        //still playing
        p.textSize(28);
        p.text(word, p.width / 2, p.height / 2);
      }
    };
    p.keyTyped = () => {
      //put in seperate function for the on-screen keyboard to share the same function.
      checkLetter(p.key);
    };
  };
  //get random word that contains 2-8 letters from api
  function pullWord() {
    fetch(
      `https://random-word-api.herokuapp.com/word?number=1&length=${Math.floor(Math.random() * (8 - 2 + 1) + 2)}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => (word = data[0]));
  }
  //checking if user typed the correct key
  function checkLetter(key) {
    if (key.toLowerCase() === word.charAt(0)) {
      word = word.substring(1);
      if (word.length === 0) {
        if (!wrong) {
          score++;
        }
        wrong = false;
        pullWord();
        wordsLeft--;
      }
    } else {
      if (!wrong && score > 0) {
        score--;
      }
      wrong = true;
    }
  }
  pullWord();
  //start stopwatch
  start();
</script>

<div class="touch-none">
  <div class="canvas">
    <P5 {sketch} />
  </div>
  <br />
  <button
    class="wordDef"
    on:click={function () {
      open(`https:www.collinsdictionary.com/us/dictionary/english/${word}`);
    }}>Word Definition</button
  >
</div>
<!--on-screen keyboard-->
<div class="keyboard">
  <div class="keyboard__row">
    {#each keyboard.keys[0] as key}
      <div
        class="key--letter"
        data-char={key}
        on:click={() => checkLetter(key)}
      >
        {key}
      </div>
    {/each}
  </div>
  <br />
  <div class="keyboard__row">
    {#each keyboard.keys[1] as key}
      <div
        class="key--letter"
        data-char={key}
        on:click={() => checkLetter(key)}
      >
        {key}
      </div>
    {/each}
  </div>
  <br />
  <div class="keyboard__row">
    {#each keyboard.keys[2] as key}
      <div
        class="key--letter"
        data-char={key}
        on:click={() => checkLetter(key)}
      >
        {key}
      </div>
    {/each}
  </div>
</div>
<style>
  .canvas {
    margin: auto;
    width: fit-content;
  }
  .keyboard {
    text-align: center;
    font-size: 1.25vh;
    font-family: sans-serif;
  }

  .keyboard__row {
    display: inline-block;
    height: 3em;
    margin: 0.2em;
  }
  .keyboard__row > * {
    position: relative;
    background: #b47f75;
    text-align: center;
    color: #000;
    float: left;
    border-radius: 0.3em;
    margin: 0.2em;
    padding: 0.2em;
    width: 5em;
    height: 95%;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #444;
    box-shadow: 0 0.2em 0 0.05em #222;
    border-bottom-color: #555;
  }
  .keyboard__row > div:active {
    background: #2a2a2a;
    color: #aaa;
    position: relative;
    top: 0.2em;
    box-shadow: 0 0 0 0.05em black;
  }
  .key--letter {
    line-height: 2.8em;
  }
  .keyboard > .keyboard__row {
    text-align: center;
  }
  .wordDef {
    color: #000;
    background-color: #b47f75;
  }
  button {
    background-color: #b47f75;
  }
</style>
