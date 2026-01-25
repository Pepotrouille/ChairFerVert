<script lang="ts">
	import DicePanel from "../components/DicePanel.svelte";
    import CharacterTabs from "../components/CharacterTabs.svelte";
    import NavigationBar from "../components/NavigationBar.svelte";
</script>

<main>
    <NavigationBar/>
    <div class="grid grid-cols-[4fr_3fr] gap-4 py-10 px-20 h-200">
        <div class="bg-base-300 rounded-sm p-5">
            Inventory
        </div>
        <div class="bg-base-300 rounded-sm p-5">
			<div class="tabs tabs-lift h-full">
				<input type="radio" name="main_tabs" class="tab w-1/2" aria-label="Dés"  />
				<div class="tab-content bg-base-200 border-base-300 p-2">
            		<DicePanel/>
				</div>
				<input type="radio" name="main_tabs" class="tab w-1/2" aria-label="Personnage" checked={true} />
				<div class="tab-content bg-base-200 border-base-300 p-2 max-h-500 overflow-y-scroll">
            		<CharacterTabs/>
				</div>
			</div>
        </div>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>