<script lang='ts'>
	import DropableBox from "./DropableBox.svelte";

    let itemDataList = [{item: {id: "test 1", imagePath: "Mushroom.png"}, x: 20, y: 25}]
    let callbackFunction = (item: any, x: number, y: number) => {
        if(!itemDataList.map(i => i.item.id).includes(item.id))
            itemDataList.push({item: item, x: x, y: y})
        else{
            console.log('Déjà existant')//TODO: Changer x y
            itemDataList.push({item: item, x: x, y: y})
        }
        itemDataList = [...itemDataList]
        console.log("GBS: callback called. Update items. New: ", itemDataList)
    }

</script>
<div class="section-main-div">
    <h2>Plateau</h2>
    <div class="divider my-2"></div>
    <DropableBox
        mainClass="slot bg-base-100 flex flex-wrap" 
        mainStyle={`height: max; width: max; `}
        id={"tabletop-test"} 
        bgImgSrc="/src/lib/assets/images/placeholder/placeholder_room.webp"
        bind:itemDataList={itemDataList}
        callbackFunction = {callbackFunction}
        deleteOnCallback = {true}
    />
</div>

<style>
    .section-main-div{
        min-width: 500px;
    }
</style>