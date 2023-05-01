<script>
  let menu = "mainMenu", theme, guidesRead=[], pages=[[{title:'Maze Game Instructions:', description:' ', howTo:' ', rules:['1. To start the game, place the mouse on the blue “Start” box at the bottom', '2. The objective of the game is to connect to the green “end” box, while avoiding the obstacles.','3. Use the mouse to move, or you can draw with your finger if your screen support touch feature.','4. If the character hits an obstacle, the game will end.','5. The game will continue until the character hits an obstacle or you close the game window.','6. To play again, move back to the blue starting area as in step 1.']}, {title:'test2', description:'test 2', benefits:{items:['test 1'], ordered:true}}], [{title:'Drag Game Instructions:', description:' ', howTo:' ', rules:['1. When the game starts, you will see six different shapes on the bottom of the canvas and three containers on the top of the canvas.','2. Your goal is to drag and drop each shape into the correct container based on its color.','3. To pick up a shape, click and hold on it with your mouse. The shape will follow your mouse cursor.','4. Move the shape to the container with the same color as the shape.','5. You will be notified If you drop the shape into the correct or the wrong container.','6. The game ends when you have successfully placed all six shapes into the correct containers.']}, {title:'test2', description:'test 2', benefits:{items:['test 1'], ordered:true}}], [{title:'Maze Game Instructions:', description:' ', howTo:' ', rules:['1. To begin playing, press the letter on your keyboard that matches the one displayed on the screen.','2. If you press the wrong key, you will see a message that says "Wrong key, please try again”.','3. Once you have successfully pressed the correct key, you can move on to the next letter by clicking anywhere on the screen. This will generate a new random letter that you need to press.','4. If you ever want to reset the game, simply click on the screen when you have not pressed the correct key. This will generate a new random letter and reset the game.','5. Keep playing and see how many letters you can correctly guess in a row! Good luck!']}, {title:'test2', description:'test 2', benefits:{items:['test 1'], ordered:true}}]]
  theme = 'light'
  import Maze from "./Maze.svelte";
  import Drag from "./Drag.svelte"
  import Key from "./Key.svelte"
  import Guide from "./Guide.svelte";
  import { onMount } from "svelte";
  import Watch from "./Watch.svelte";
  let games = [{name:'Maze Game', index:1, component:Maze}, {name:'Drag Game', index:2, component:Drag}, {name:'Key Game', index:3, component:Key}];
  onMount(() => {
  let paramString = window.location.href.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  let game = queryString.get('open')
  menu =  game || menu  
  })
</script>
<main class="{theme}">
  {#if menu === "mainMenu"}
  <h1 class="font-mono uppercase font-bold text-pink-500">Mouse Games</h1>
    <div class="grid space-y-5 games">
      {#each games as game}
      <button on:click={() => (window.location.href = window.location.origin + `?open=${game.name}`)} class="{theme} game">{game.name}</button>
      {/each}
    </div>
  {:else}
    {#each games as game}
    {#if menu == game.name}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold text-green-500">{game.name}</h1>
      {#if guidesRead.includes(game.index) || localStorage.getItem((game.index).toString())}
      <svelte:component this={game.component}/>
      <button class="{theme}"
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button
      >
      {:else}
      <Guide pages={pages[game.index-1]}/>
      <button on:click={function(){guidesRead.push(game.index);guidesRead=guidesRead;localStorage.setItem((game.index).toString(), 'true')}}>done</button>
      <button class="{theme}"
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button>
      {/if}
    </div>
    {/if}
    {/each}
  {/if}
</main>
<style>
  @keyframes rot{
  0% {
    transform: rotate(0deg);
  }
  40%{
    transform: rotate(360deg);
  }
  90%{
    transform: rotate(400deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
@keyframes rot2{
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.theme{
  animation: rot 3s ease-out 1 normal none;
}
.theme2{
  color: white;
  animation: rot2 5s infinite 0s linear normal none;
}
.light{
  background: white;
  color: black;
}
.dark{
  background-color: black;
  color: white;
}
main{
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100vw;
  text-align: center;
}
.game{
  width: 40vw;
}
.games{
  position: absolute;
  top: 20%;
  left: 30%;
}
</style>