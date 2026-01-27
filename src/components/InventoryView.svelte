<script lang="ts">
	import ObjectSlot from "./ObjectSlot.svelte";
	import BinIcon from "./svg_icons/BinIcon.svelte";
    const slotNumber: number = 12; //TODO: Must depend on the Database
    const size: number = 80;
</script>

<div class="inventory-zone">
    <h3>Inventory</h3>
    <div class="flex flex-wrap gap-3 pt-5 px-[10%] justify-center">
        {#each {length: slotNumber} as _, i }
            <ObjectSlot id={"InventorySlot" + i} object={i<3?"Test":undefined} size={size}/>
        {/each}
    </div>
    
    <div class="flex flex-wrap gap-3 pt-5 px-[15%] justify-center">
        <div 
            class="bin-slot bg-base-300 drop-target pl-4 pt-2" 
            style={`height: ${size}px; width: ${size}px;`}
            id={"inventory-bin"}>
            <BinIcon color="white" width={150} height={150}/>
        </div>
    </div>
</div>

<style>
    .bin-slot {
        border-radius: 15%;
        opacity: 80%;
    }
</style>