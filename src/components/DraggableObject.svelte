<script lang="ts">
    import { draggable } from "@neodrag/svelte";
    let draggableEl: HTMLElement;

    export let size: number = 48;
    export let baseX: number = 0;
    export let baseY: number = 0;
    export let imagePath: string = "Mushroom.png";


    let isDragged: boolean = false;

    const images: any = import.meta.glob(['$lib/assets/images/objects/**.png'], { eager: true, as: 'url' });
    
    let currentX: number = baseX;
    let currentY: number = baseY;

    $: if (baseX) {currentX = baseX};
    $: if (baseY) {currentY = baseY};

    export function resetToInitialPosition() {
        currentX = baseX;
        currentY = baseY;
    }

    const handleDragStart = (e: CustomEvent) => {
        isDragged = true;
		currentX = e.detail.offsetX
		currentY = e.detail.offsetY
    }
    const handleDragEnd = () => {
        isDragged = false;
		currentX = baseX
		currentY = baseY
        checkForDropZones()
	}

    function checkForDropZones() {
        const dropZones = Array.from(document.getElementsByClassName("drop-target"))
        const draggedRect = draggableEl.getBoundingClientRect();

         let zoneName: string = "";

        const hitZone = dropZones.find(zone => {
            const rect = zone.getBoundingClientRect();
            return (
            draggedRect.left < rect.right &&
            draggedRect.right > rect.left &&
            draggedRect.top < rect.bottom &&
            draggedRect.bottom > rect.top
            );
        });

        if (hitZone) {
            zoneName = hitZone.id || "";
        }
        console.log(zoneName? `La zone ${zoneName} a été touchée`: "Aucune zone détectée")
    }

</script>

<div
    class={"absolute tooltip z-5" + (!isDragged ? " slight-bounce" : "")}
    bind:this={draggableEl}
    use:draggable={{ position: { x:currentX, y: currentY } }}
	on:neodrag={handleDragStart}
	on:neodrag:end={handleDragEnd}
    style={`position: absolute; width: ${size}px; height: ${size}px;`}
>
    {#if !isDragged}
        <div class="tooltip-content">
            <div>Description blabla!</div>
        </div>
    {/if}
    <img
        
        style={`height: ${size}px; width: ${size}px;`}
        src={images[`/src/lib/assets/images/objects/${imagePath}`]}
        alt={"object: " + imagePath}
    >
</div>

<style>
    .slight-bounce:hover {
        animation: slight-bounce 0.8s infinite;
    }

    @keyframes slight-bounce {
        0%, 100% {
            transform: translateY(-10%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
    }
</style>
