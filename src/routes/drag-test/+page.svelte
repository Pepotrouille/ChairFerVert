<script lang="ts">
    import { draggable } from "@neodrag/svelte";

    let zoneName: string = "";

    let draggableEl: HTMLElement;
    let dropZones: HTMLElement[] = [];

    function registerDropZone(node: HTMLElement) {
        dropZones.push(node);

        return {
        destroy() {
            dropZones = dropZones.filter(z => z !== node);
        }
        };
    }

    function onDragEnd() {
        const draggedRect = draggableEl.getBoundingClientRect();

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
            zoneName = hitZone.dataset.zoneId ||"";
        }
    }
</script>

<main>
    <a href="/">Back</a>
    <div role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{zoneName == ""? "": "Element dropped on " + zoneName}</span>
    </div>
    
    <article
        bind:this={draggableEl}
        use:draggable
        on:neodrag:end={onDragEnd}
        class="draggable"
    >
        Drag me
    </article>
    <div class="grid grid-cols-6 gap-4">
        <div use:registerDropZone data-zone-id="inventory" class="drop-target">
            Inventory
        </div>
        <div use:registerDropZone data-zone-id="scene" class="drop-target">
            Scene
        </div>
    </div>
    
        
    <div class="map-display">

    </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

    .map-display {
        background-color: aqua;
    }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
    .draggable {
        width: 100px;
        height: 100px;
        background: #6c5ce7;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
    }

    .drop-target {
        margin-top: 200px;
        width: 300px;
        height: 200px;
        border: 2px dashed #aaa;
    }

</style>