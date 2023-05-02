import { writable } from "svelte/store";
  export let time = writable(0);
    let interval;
    let running = false;
    export function formatTime(time){
      return "Hours: " + Math.floor((time / (1000 * 60 * 60)) % 24) + " Minutes: " + Math.floor((time / (1000 * 60)) % 60) + " Seconds: " + Math.floor((time / 1000) % 60);
    };
    export function start() {
      if (!running) {
        running = true;
        interval = requestAnimationFrame(update);
      }
    }
    export function reset() {
      cancelAnimationFrame(interval);
      running = false;
      time.set(0);
    }
    export function pause(){
      cancelAnimationFrame(interval);
      running = false;
    }
    export function update() {
      time.update(n=>n+=10);
      interval = requestAnimationFrame(update);
    }