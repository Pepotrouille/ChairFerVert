<script lang="ts">
	import DropableBox from "./DropableBox.svelte";
	import ObjectSlot from "./ObjectSlot.svelte";
	import BinIcon from "./svg_icons/BinIcon.svelte";
    const slotNumber: number = 12; //TODO: Must depend on the Database
    const size: number = 80;
</script>

<div class="inventory-zone">
    <h3>Inventory</h3>
    <div class="flex flex-wrap gap-3 pt-5 px-[10%] justify-center">
        {#each {length: slotNumber} as _, i }
            <ObjectSlot id={"InventorySlot" + i} item={i<3?{id: "inventory-item-"+i, imagePath: "Mushroom.png"}:undefined} size={size}/>
        {/each}
    </div>
    
    <div class="flex flex-wrap gap-3 pt-5 px-[15%] justify-center">
        <DropableBox 
            mainClass="bg-base-300 drop-target pl-4 pt-2" 
            mainStyle={`height: ${size}px; width: ${size}px; border-radius: 15%; opacity: 80%;`}
            id={"inventory-bin"}
            itemDataList = {[]}
            callbackFunction = {() => {console.log("Thwrew away")}/**ADD ALERT TO NOT DELETE BY ACCIDENT*/}
            deleteOnCallback = {true}
            >
            <BinIcon color="white" width={150} height={150} />
        </DropableBox>
    </div>
</div>
