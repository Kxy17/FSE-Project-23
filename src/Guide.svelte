<!-- @ts-nocheck -->
<script>
export let pages;
let currentPageNum = 0
</script>
{#if pages[currentPageNum].title}
    <p>{pages[currentPageNum].title}</p>
{/if}
{#if pages[currentPageNum].description}
<p>{pages[currentPageNum].description}</p>   
{/if}
{#if pages[currentPageNum].howTo}
<ul>
    {#each pages[currentPageNum].howTo as point}
        <li>{point}</li>
    {/each}
</ul>
{/if}
{#if pages[currentPageNum].imgs}
{#if pages[currentPageNum].imgs.length > 0}
{#if pages[currentPageNum].imgs[0] != 'empty'}
    <img src={pages[currentPageNum].imgs[0]} alt="loading...">
{/if}
{/if}
{#if pages[currentPageNum].imgs.length > 1}
{#if pages[currentPageNum].imgs[1] != 'empty'}
    <img src={pages[currentPageNum].imgs[1]} alt="loading...">
{/if}
{/if}
{/if}
{#if pages[currentPageNum].rules}
<p>Rules:</p>
<ul>
    {#each pages[currentPageNum].rules as rule}
        <li>{rule}</li>
    {/each}
</ul>
{/if}
{#if pages[currentPageNum].imgs}
{#if pages[currentPageNum].imgs.length > 2}
{#if pages[currentPageNum].imgs[2] != 'empty'}
    <img src={pages[currentPageNum].imgs[2]} alt="loading...">
{/if}
{/if}
{#if pages[currentPageNum].imgs.length > 3}
{#if pages[currentPageNum].imgs[3] != 'empty'}
    <img src={pages[currentPageNum].imgs[3]} alt="loading...">
{/if}
{/if}
{/if}
{#if pages[currentPageNum].benefits}
<ul>
    {#each pages[currentPageNum].benefits.items as item}
        <li>{item}</li>        
    {/each}
</ul>
{/if}
{#if currentPageNum > 0 && pages.length > 1}
<button on:click={function(){currentPageNum--}}>previous</button>
{/if}
{#if pages.length > currentPageNum + 1}
<button on:click={function(){currentPageNum++}}>next</button>
{/if}
<style>
     button{
    background-color: blue;
  }
</style>