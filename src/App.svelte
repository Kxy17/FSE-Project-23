<script>
  let menu = "mainMenu", theme, guidesRead=[], pages=[[{title:'test1'}, {title:'test2'}], [], []]
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