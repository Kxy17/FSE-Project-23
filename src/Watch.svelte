<script>
    import { onMount } from 'svelte';
  
    let time = 0;
    let interval;
    let running = false;
  
    function formatTime(time){
      return `${Math.floor(time / 1000)}:${(time % 1000) / 10}`;
    };
  
    function start() {
      if (!running) {
        running = true;
        interval = requestAnimationFrame(update);
      }
    }
  
    function reset() {
      cancelAnimationFrame(interval);
      running = false;
      time = 0;
    }

    function pause(){
      cancelAnimationFrame(interval);
      running = false;
    }
  
    function update() {
      time += 10;
      interval = requestAnimationFrame(update);
    }
  
    onMount(() => {
      // Perform expensive operations here
    });
  </script>
  
  <div>
    <h1>{@html formatTime(time)}</h1>
  </div>
  