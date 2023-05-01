import { writable } from "svelte/store";

    export let time = writable(0);
    let interval;
    let running = false;
    export function formatTime(time){
      return time>60*1000?(Math.floor(time / 1000)+' Minutes '+Math.floor((time-60) / 60000)+' Second(s)'):(Math.floor(time / 1000) + ' Second(s)')  
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