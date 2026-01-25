<script>
    import CharacterDescriptionView from "./CharacterDescriptionView.svelte";
    import BodyView from "./BodyView.svelte";
    import InventoryView from "./InventoryView.svelte";
</script>

<div class="tabs tabs-lift h-full">
    <input type="radio" name="my_tabs_3" class="tab" aria-label="Description" checked={true}  />
    <div class="tab-content bg-base-100 border-base-300 p-6">
        <CharacterDescriptionView/>
    </div>

    <input type="radio" name="my_tabs_3" class="tab" aria-label="Corps"/>
    <div class="tab-content bg-base-100 border-base-300 p-6">
        <BodyView/>
    </div>

    <input type="radio" name="my_tabs_3" class="tab" aria-label="Inventaire" />
    <div class="tab-content bg-base-100 border-base-300 p-6">
        <InventoryView/>
    </div>
</div>