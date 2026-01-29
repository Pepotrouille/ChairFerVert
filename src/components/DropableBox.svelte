<script lang='ts'>
	import DraggableObject from "./DraggableObject.svelte";

    export let bgImgSrc: string
    export let mainClass: string
    export let mainStyle: string
    export let id: string
    export let itemDataList: any
    export let callbackFunction: CallableFunction | null = null
    export let deleteOnCallback: boolean = false

    let dropableBoxDiv: HTMLDivElement;
    import { onMount } from "svelte";
    onMount(() => {
        if (dropableBoxDiv) {
            (dropableBoxDiv as any).callbackFunction = callbackFunction;
            (dropableBoxDiv as any).deleteOnCallback = deleteOnCallback
        }
    });

    $: if (itemDataList) {
        console.log("DB: Items updated: ", itemDataList)
        itemDataList = itemDataList
    }
</script>



<div 
    class={"drop-target " + mainClass}
    style={mainStyle}
    id={id} 
    bind:this={dropableBoxDiv}
>

    <img src={bgImgSrc} alt="backgroundForDropable"/>
    {#each itemDataList as itemDataList, i}
        <DraggableObject baseX={itemDataList.x} baseY={itemDataList.y} item={itemDataList.item}/>  
    {/each}
</div>