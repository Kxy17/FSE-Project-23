<script>
import P5 from 'p5-svelte';
  let word = '';
  let words = [];
  let score = 0;
  let wrong = false;
  let selectedKey = "";
  let keyboard = {keys:[["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"],["Z","X","C","V","B","N","M"]]}
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
    };
    p.draw = () => {
      p.background(220);
      p.textAlign(p.CENTER);
      p.textSize(32);
      p.text(word, p.width / 2, p.height / 2);
      p.textSize(16);
      p.text(`Score: ${score}`, p.width / 2, p.height / 2 + 50);
    };
    p.keyTyped = () => {
     checkLetter(p.key)
    };
    if(words.length < 5){
      pullWords(50, 4)
    }
  };
  pullWords(10,4)
  function pullWords(amount, length){
    fetch(`https://random-word-api.herokuapp.com/word?number=${amount}&length=${length}`, {method:'GET'})
    .then((res)=>res.json())
    .then((data)=>words = data)
    .then((func)=>word = words[words.length-1])
  }
  function checkLetter(key){
    selectedKey = key.toUpperCase()
    if (key.toLowerCase() === word.charAt(0)) {
        word = word.substring(1);
        if (word.length === 0) {
          if(!wrong){
            score++;
          }
          wrong = false;
          words.pop();
          word = words[words.length-1];
        }
      }else{
        if(!wrong&&score>0){
          score--;
        }
        wrong = true
      }
  }
    </script>
<div class="touch-none">
  <div class="canvas">
    <P5 {sketch} />
  </div>
  <br>
  <button class="wordDef">Word Definition</button>
</div>
<div class="keyboard">
  <div class="keyboard__row">
    {#each keyboard.keys[0] as key}
    <div class="key--letter" data-char={key} on:click={()=>checkLetter(key)}>{key}</div>
    {/each}
  </div>
  <br>
  <div class="keyboard__row">
    {#each keyboard.keys[1] as key}
    <div class="key--letter" data-char={key} on:click={()=>checkLetter(key)}>{key}</div>
    {/each}
  </div>
  <br>
  <div class="keyboard__row">
    {#each keyboard.keys[2] as key}
    <div class="key--letter" data-char={key} on:click={()=>checkLetter(key)}>{key}</div>
    {/each}
  </div>
</div>
<style>
.canvas{
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
    background: #333;
    text-align: center;
    color: #eee;
    float: left;
    border-radius: 0.3em;
    margin: 0.2em;
    padding: 0.2em;
    width: 3.3em;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-user-select: none;
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
.wordDef{ 
  background-color: #fff;
}
</style>