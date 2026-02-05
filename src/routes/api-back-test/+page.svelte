<script lang="ts">
	import { onMount } from "svelte";
  import type { Player } from "../../models/models.ts"

  let players: any[] = []
  let name: string = "";

  async function loadPlayers() {
    const res = await fetch('http://localhost:8000/players')
    players = await res.json()
    console.log(players)
  }

  async function createPlayer(data: Player) {
    const response = await fetch("http://localhost:8000/players", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Blast! Our letter was not received favorably: ${response.statusText}`);
    }
    const new_player = await response.json();
    loadPlayers()
    name=""
    return new_player
    
  }

	onMount(() => {
    loadPlayers()
	});

</script>

<main>
    <a href="/">Back</a>
    <div class="w-full">
      <h2>Reload Players</h2>
      <button class="btn" onclick={loadPlayers}>Load</button>
      {#each players as player}
        <p>{player.name}</p>
      {/each}
    </div>

    <input
      bind:value={name}
      id="nameTestInput"
      type="text"
      placeholder="Entrer le nom d'un joueur"
      class="input flex-1 min-w-0"
    />
    <button class="btn" onclick={()=>createPlayer({id:0, isAdmin: false, name: name, login: name, password: "Test"})}>
      Create
    </button>
</main>
