<script>
  let menu = "mainMenu", mounted = false, theme;
  theme = 'light'
  import Maze from "./Maze.svelte";
  import Drag from "./Drag.svelte"
  import Key from "./Key.svelte"
  import { onMount } from "svelte";
  import {register} from './user-management'
  onMount(() => {
  let paramString = window.location.href.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  let game = queryString.get('open')
  menu =  game || menu  
  mounted = true
  })
</script>

<main class="{theme}">
  {#if menu === "mainMenu"}
  <h1 class="font-mono uppercase font-bold text-pink-500">Mouse Games</h1>
    <div class="grid space-y-5 games">
      <button on:click={() => (window.location.href = window.location.origin + "?open=mazeGame")} class="{theme} game">Maze Game</button>
      <button on:click={() => (window.location.href = window.location.origin + "?open=dragGame")} class="{theme} game">Drag Game</button>
      <button on:click={() => (window.location.href = window.location.origin + "?open=keyGame")} class="{theme} game">Key Game</button>
    </div>
  {:else if menu === "mazeGame"}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold text-green-500">Maze Game</h1>
      <Maze />
      <button class="{theme}"
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button
      >
    </div>
  {:else if menu === "dragGame"}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold">Drag Game</h1>
      <Drag />
      <button class="{theme}"
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button
      >
    </div>
    {:else if menu === "keyGame"}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold">Keyboard Game</h1>
      <Key />
      <button class="{theme}"
        on:click={() => {
          menu = "mainMenu";
          window.location.href = window.location.origin;
        }}>Back</button
      >
    </div>
  {/if}
  {#if theme == 'dark'}
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="theme2" on:click={function(){theme='light'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="theme" on:click={function(){theme='dark'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
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