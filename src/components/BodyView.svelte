<script lang="ts">
	import vitruvianFrontImg from '$lib/assets/images/ui/VitruvianFront.png';
	import vitruvianBackImg from '$lib/assets/images/ui/VitruvianBack.png';
	import DropableBox from './DropableBox.svelte';
	import ObjectSlot from './ObjectSlot.svelte';
    const innerSlotNumber: number = 8; //TODO: Must depend on the Database
    type FrontSlotKey =
        | "headSlot"
        | "chestSlot"
        | "leftLegSlot"
        | "rightLegSlot"
        | "leftArmSlot"
        | "rightArmSlot";

    const itemDataFrontSlots: Record<FrontSlotKey, any> = {
        headSlot: null,
        chestSlot: null,
        leftLegSlot: null,
        rightLegSlot: null,
        leftArmSlot: null,
        rightArmSlot: null,
    };
    const frontStyles: Record<FrontSlotKey, string>={
        headSlot: "top: 20%; left: 44.75%;",
        chestSlot: "top: 34%; left: 44.75%;",
        leftLegSlot: "top: 72%; left: 28%;",
        rightLegSlot: "top: 72%; right: 30%;",
        leftArmSlot: "top: 28%; left: 20%;",
        rightArmSlot: "top: 28%; right: 20%;"
    }
    const frontKeys = Object.keys(itemDataFrontSlots) as FrontSlotKey[];

    type BackSlotKey =
        | "upperBackSlot"
        | "lowerBackSlot"
    const itemDataBackSlots: Record<BackSlotKey, any> = {
        upperBackSlot: null,
        lowerBackSlot: null
    };
    const backStyles: Record<BackSlotKey, string>={
        upperBackSlot: "top: 30%; left: 44.75%;",
        lowerBackSlot: "top: 50%; left: 44.75%;"
    }
    const backKeys = Object.keys(itemDataBackSlots) as BackSlotKey[];

    const bodySlot="position: absolute; width: 12%; height: 12%; border-radius: 15%; opacity: 80%;"
    
</script>

<div class="overflow-y-auto">
    <h3>Membres externes</h3>
    <div class="external-slots">
        <div class="image-wrapper">
            <img src={vitruvianFrontImg} alt="Front view" />
            <!-- Overlay example -->
             {#each frontKeys as key}
                <ObjectSlot
                    mainClass="body-slot bg-base-300 head" 
                    mainStyle={`height: max; width: max; `  + frontStyles[key] + bodySlot}
                    id={key} 
                    size={0}
                    bind:item={itemDataFrontSlots[key]}
                />
            {/each}
        </div>
        <div class="image-wrapper">
            <img src={vitruvianBackImg} alt="Back view"/>
             {#each backKeys as key}
                <ObjectSlot
                    mainClass="body-slot bg-base-300 head" 
                    mainStyle={`height: max; width: max; `  + backStyles[key] + bodySlot}
                    id={key} 
                    size={0}
                    bind:item={itemDataBackSlots[key]}
                />
            {/each}
        </div>
    </div>

    <div class="divider my-2"></div>

    <h3>Membres internes</h3>
    <div class="flex flex-wrap gap-3 pt-5 px-5 justify-center">
        {#each {length: innerSlotNumber} as _, i }
            <div class="inner-slot bg-base-300" id={"innerSlot" + i}></div>
        {/each}
    </div>
</div>


<style>
    .external-slots {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .image-wrapper {
        position: relative;
        width: 100%;
    }

    .image-wrapper img {
        width: 100%;
        height: auto;
        display: block;
        user-select: none;
    }
    
    .inner-slot {
        width: 50px;
        height: 50px;
        border-radius: 15%;
        opacity: 80%;
    }

    /* Example positions */

</style>