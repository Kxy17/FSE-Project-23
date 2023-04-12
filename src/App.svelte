<script>
  let menu = "mainMenu";

  import Maze from "./Maze.svelte";
  import Drag from "./Drag.svelte"
</script>

<main>
  {#if menu === "mainMenu"}
    <div class="grid space-y-5">
      <h1 class="font-mono uppercase font-bold text-green-500">Main Menu</h1>
      <button on:click={() => (menu = "mazeGame")}>Maze Game</button>
      <button on:click={() => (menu = "dragGame")}>Drag Game</button>
    </div>
  {:else if menu === "mazeGame"}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold text-green-500">Maze Game</h1>
      <Maze />
      <button
        on:click={() => {
          menu = "mainMenu";
        }}>Back</button
      >
    </div>
  {:else if menu === "dragGame"}
    <div class="grid space-y-4 justify-center">
      <h1 class="font-mono uppercase font-bold">Drag Game</h1>
      <Drag />
      <button
        on:click={() => {
          menu = "mainMenu";
        }}>Back</button
      >
    </div>
  {/if}
</main>
