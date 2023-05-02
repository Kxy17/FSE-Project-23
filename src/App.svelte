<script>
  let menu = "mainMenu", 
  guidesRead=[], 
  pages=[[{title:'Maze Game Instructions:', howTo:['1. To start the game, place the mouse on the blue “Start” box at the bottom', '2. The objective of the game is to connect to the green “end” box, while avoiding the obstacles.','3. If the character hits an obstacle, the game will end.','4. The game will continue until the character hits an obstacle or you close the game window.','5. To play again, move back to the blue starting area as in step 1.']}], [{title:'Drag Game Instructions:', howTo:['1. When the game starts, you will see six different shapes on the bottom of the canvas and three containers on the top of the canvas.','2. Your goal is to drag and drop each shape into the correct container based on its color.','3. To pick up a shape, click and hold on it with your mouse. The shape will follow your mouse cursor.','4. Move the shape to the container with the same color as the shape.','5. You will be notified whether you drop the shape into the correct container.','6. The game ends when you have successfully placed all six shapes into the correct containers.']}], [{title:'Keyboard Game Instructions:', description:' ', howTo:['1. To begin playing, press the letter on your keyboard that matches the one displayed on the screen.','2. If you press the wrong key, you will see a message that says "Wrong key, please try again”.','3. Once you have successfully pressed the correct key, you can move on to the next letter by clicking anywhere on the screen. This will generate a new random letter that you need to press.','4. If you ever want to reset the game, simply click on the screen when you have not pressed the correct key. This will generate a new random letter and reset the game.','5. Keep playing and see how many letters you can correctly guess in a row! Good luck!']}]]
  import Maze from "./Maze.svelte";
  import Drag from "./Drag.svelte"
  import Key from "./Key.svelte"
  import Guide from "./Guide.svelte";
  import Signin from "./Signin.svelte";
  import {userData} from './user-management'
  import { onMount } from "svelte";
  let games = [{name:'Maze Game', index:1, component:Maze}, {name:'Drag Game', index:2, component:Drag}, {name:'Key Game', index:3, component:Key}];
  onMount(() => {
  let paramString = window.location.href.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  let game = queryString.get('open')
  menu =  game || menu  
  })
</script>
<main>
  {#if $userData.data}
  {#if menu === "mainMenu"}
  <h1 class="font-mono uppercase font-bold text-black-500">Mouse Games</h1>
    <div class="grid space-y-5 games">
      {#each games as game}
      <button on:click={() => (window.location.href = window.location.origin + `?open=${game.name}`)} class="game">{game.name}</button>
      {/each}
    </div>
  {:else}
    {#each games as game}
    {#if menu == game.name}
    <div class="grid space-y-4 justify-center">
      {#if guidesRead.includes(game.index) || localStorage.getItem((game.index).toString())}
      <svelte:component this={game.component}/>
      <button
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button
      >
      {:else}
      <Guide pages={pages[game.index-1]}/>
      <button on:click={function(){guidesRead.push(game.index);guidesRead=guidesRead;localStorage.setItem((game.index).toString(), 'true')}}>done</button>
      <button
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button>
      {/if}
    </div>
    {/if}
    {/each}
  {/if}
  {:else}
  <Signin/>
  {/if}
</main>
<style>
main{
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100vw;
  text-align: center;
  background-color: #B8D5D8;
}
.game{
  width: 40vw;
}
.games{
  position: absolute;
  top: 20%;
  left: 30%;
}
  button{
    background-color: #B47F75;
  }

</style>