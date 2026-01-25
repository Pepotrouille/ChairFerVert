<script lang="ts">
    const slotNumber: number = 12; //TODO: Must depend on the Database
</script>

<div>
    <h3>Inventory</h3>
    <div class="flex flex-wrap gap-3 pt-5 px-[15%] justify-center">
        {#each {length: slotNumber} as _, i }
            <div class="slot bg-base-300" id={"slot" + i}></div>
        {/each}
    </div>
</div>

<style>
    .slot {
        width: 80px;
        height: 80px;
        border-radius: 15%;
        opacity: 80%;
    }
</style>