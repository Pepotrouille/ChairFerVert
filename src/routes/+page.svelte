<script lang="ts">
    import NavBar from "../components/NavigationBar.svelte";
    import CharacterTabs from "../components/CharacterTabs.svelte";
</script>

<main>
    <NavBar/>
    <div class="grid grid-cols-[4fr_3fr] gap-4 py-10 px-20 h-200">
        <div class="bg-base-300 rounded-sm p-5">
            Inventory
        </div>
        <div class="bg-base-300 rounded-sm p-5">
            <CharacterTabs/>
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