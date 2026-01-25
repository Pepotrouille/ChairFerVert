<script lang="ts">
	import vitruvianFrontImg from '$lib/assets/images/ui/VitruvianFront.png';
	import vitruvianBackImg from '$lib/assets/images/ui/VitruvianBack.png';
    const innerSlotNumber: number = 8; //TODO: Must depend on the Database
</script>

<div class="overflow-y-auto">
    <h3>Membres externes</h3>
    <div class="external-slots">
        <div class="image-wrapper">
            <img src={vitruvianFrontImg} alt="Front view" />
            <!-- Overlay example -->
            <div class="body-slot bg-base-300 head" id="headSlot"></div>
            <div class="body-slot bg-base-300 chest" id="chestSlot"></div>
            <div class="body-slot bg-base-300 left-leg" id="leftLegSlot"></div>
            <div class="body-slot bg-base-300 right-leg" id="rightLegSlot"></div>
            <div class="body-slot bg-base-300 left-arm" id="leftArmSlot"></div>
            <div class="body-slot bg-base-300 right-arm" id="rightArmSlot"></div>
        </div>
        <div class="image-wrapper">
            <img src={vitruvianBackImg} alt="Back view"/>

            <div class="body-slot bg-base-300 chest" id="upperBackSlot"></div>
            <div class="body-slot bg-base-300 hips" id="lowerBackSlot"></div>
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

    .body-slot {
        position: absolute;
        width: 12%;
        height: 12%;
        border-radius: 15%;
        opacity: 80%;
    }
    
    .inner-slot {
        width: 50px;
        height: 50px;
        border-radius: 15%;
        opacity: 80%;
    }

    /* Example positions */
    .body-slot.head {
        top: 20%;
        left: 44.75%;
    }
    .body-slot.chest {
        top: 34%;
        left: 44.75%;
    }
    .body-slot.hips {
        top: 50%;
        left: 44.75%;
    }
    .body-slot.left-leg {
        top: 72%;
        left: 28%;
    }
    .body-slot.right-leg {
        top: 72%;
        right: 30%;
    }
    .body-slot.left-arm {
        top: 28%;
        left: 20%;
    }
    .body-slot.right-arm {
        top: 28%;
        right: 20%;
    }
</style>