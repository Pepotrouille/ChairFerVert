<script lang='ts'>
	import DraggableObject from "./DraggableObject.svelte";

    export let bgImgSrc: string = ""
    export let mainClass: string
    export let mainStyle: string
    export let id: string
    export let itemDataList: any
    export let callbackFunction: CallableFunction | null = null
    export let deleteOnCallback: boolean = false
    export let innerHTML: string = ""

    let dropableBoxDiv: HTMLDivElement;
    import { onMount } from "svelte";
    onMount(() => {
        if (dropableBoxDiv) {
            (dropableBoxDiv as any).callbackFunction = callbackFunction;
            (dropableBoxDiv as any).deleteOnCallback = deleteOnCallback
        }
    });

    $: if (itemDataList) {
        itemDataList = itemDataList
    }

    const deleteItem = (zone: any, itemId: string) => {
        if(zone.id !== id)
            itemDataList = itemDataList.filter((i: any)=>i.item.id != itemId)
        }
</script>



<div 
    class={"drop-target " + mainClass}
    style={mainStyle}
    id={id} 
    bind:this={dropableBoxDiv}
>
    {#if bgImgSrc}
        <img src={bgImgSrc} alt="backgroundForDropable"/>
    {/if}
    {#each itemDataList as itemData, i}
        <DraggableObject size={itemData.size} baseX={itemData.x} baseY={itemData.y} item={itemData.item} callbackDelete={(zone: any)=>deleteItem(zone, itemData.item.id)}/>  
    {/each}
    <slot />
</div>