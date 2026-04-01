<script lang="ts">
    import { onMount } from "svelte";
	import DropableBox from "./DropableBox.svelte";
    export let mainClass: string = "";
    export let mainStyle: string = "";
    export let id: string;
    export let size: number = 80;
    export let item: any;
    //{item: {id: "Test", imagePath: "Mushroom.png"}, x: -size*0.5 +2.5, y: 0, size: size-5}
    let itemDataList = item? [{item: item, x: -size*0.5 +2.5, y: 0, size: size-5}]: []
    let dropBoxEl: any = null;
    let realSize = size;

    onMount(() => {
        if (size > 0){
            realSize = size
        }
        if (dropBoxEl && dropBoxEl instanceof HTMLElement) {
            const rect = dropBoxEl.getBoundingClientRect();
            realSize = rect.width;
        }
    });

    let callbackFunction = (item: any, x: number, y: number) => {
        if (dropBoxEl) {
            if(itemDataList.length == 0){
                itemDataList.push({item: item, x: -realSize*0.5 +2.5, y: 0, size: realSize-5})
            }
            itemDataList = [...itemDataList]
        }
        
    }


    </script>

<DropableBox 
    dropableBoxDiv={dropBoxEl}
    mainClass={"bg-base-300 drop-target " + mainClass}
    mainStyle={(realSize>0? `height: ${size}px; width: ${size}px;`: "")+ `border-radius: 15%; opacity: 80%;` + mainStyle}
    id={"my-inventory-" + id}
    bind:itemDataList={itemDataList}
    callbackFunction = {callbackFunction}
    deleteOnCallback = {true}
    >
</DropableBox>
