<script>
    import CharacterDescriptionView from "./CharacterDescriptionView.svelte";
    import BodyView from "./BodyView.svelte";
    import InventoryView from "./InventoryView.svelte";
</script>

<div class="tabs tabs-lift h-full">
    <input type="radio" name="character_tabs" class="tab w-1/3" aria-label="Description" checked={true}  />
    <div class="tab-content bg-base-100 border-base-300 p-6 overflow-y-auto max-h-145 tab-zone">
        <CharacterDescriptionView/>
    </div>

    <input type="radio" name="character_tabs" class="tab w-1/3" aria-label="Corps"/>
    <div class="tab-content bg-base-100 border-base-300 p-6 overflow-y-auto max-h-145 tab-zone">
        <BodyView/>
    </div>

    <input type="radio" name="character_tabs" class="tab w-1/3" aria-label="Inventaire" />
    <div class="tab-content bg-base-100 border-base-300 p-6 overflow-hidden max-h-145 tab-zone">
        <InventoryView/>
    </div>
</div>

<style>
    .tab-zone{
        min-width: 510px;
    }
</style>