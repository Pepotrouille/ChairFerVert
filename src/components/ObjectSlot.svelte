<script lang="ts">
	import DropableBox from "./DropableBox.svelte";
    export let id: string;
    export let size: number = 80;
    export let item: any;
    //{item: {id: "Test", imagePath: "Mushroom.png"}, x: -size*0.5 +2.5, y: 0, size: size-5}
    let itemDataList = item? [{item: item, x: -size*0.5 +2.5, y: 0, size: size-5}]: []


    let callbackFunction = (item: any, x: number, y: number) => {
        if(itemDataList.length == 0){
            itemDataList.push({item: item, x: -size*0.5 +2.5, y: 0, size: size-5})
        }
        itemDataList = [...itemDataList]
    }


    </script>

<DropableBox 
        mainClass="bg-base-300 drop-target" 
        mainStyle={`height: ${size}px; width: ${size}px; border-radius: 15%; opacity: 80%;`}
        id={"my-inventory-" + id}
        bind:itemDataList={itemDataList}
        callbackFunction = {callbackFunction}
        deleteOnCallback = {true}
     >
</DropableBox>
