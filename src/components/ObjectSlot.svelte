<script lang="ts">
// filepath: src/components/ObjectSlot.svelte
import DraggableObject from "../components/DraggableObject.svelte";
export let id: string;
export let size: number = 80;
export let object: any = undefined;
let slot: HTMLDivElement;

</script>

<div 
    class="slot bg-base-300" 
    style={`height: ${size}px; width: ${size}px;`}
    bind:this={slot}
    id={id} >
    {#if object != undefined}
        <DraggableObject size={size-5} baseX={-size*0.5 +2.5} baseY={0}/>
    {/if}
</div>

<style>
    .slot {
        border-radius: 15%;
        opacity: 80%;
    }
</style>