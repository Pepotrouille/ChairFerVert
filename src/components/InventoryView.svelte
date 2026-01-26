<script lang="ts">
	import DraggableObject from "../components/DraggableObject.svelte";
	import ObjectSlot from "./ObjectSlot.svelte";
    const slotNumber: number = 12; //TODO: Must depend on the Database
</script>

<div>
    <h3>Inventory</h3>
    <div class="flex flex-wrap gap-3 pt-5 px-[15%] justify-center">
        {#each {length: slotNumber} as _, i }
            <ObjectSlot id={"InventorySlot" + i} object={i<3?"Test":undefined}/>
        {/each}
    </div>
</div>