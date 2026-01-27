<script lang="ts">
    import { onMount, tick } from "svelte";
    import ChatLog from "./ChatLog.svelte";
    import DiceIcon from "./svg_icons/DiceIcon.svelte";
    import InputIcon from "./svg_icons/InputIcon.svelte";
    import ThrowIcon from "./svg_icons/ThrowIcon.svelte";

    let chatInput: string = ""
    let nbThrows: number = 1
    let nbFaces: number = 100

    //TODO: Get logs from DB
    let logs: LogEntry[] = [];
    
	onMount(() => {
        goToLastLog()
        document.getElementById("chatInput")?.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage()
            }
        }); 
	});

    type LogEntry =
        | { kind: "dice"; player: string; value: number; max: number; date: string, id: number }
        | { kind: "text"; player: string; message: string; date: string, id: number };

    const goToLastLog = () => {
        let scroll=document.getElementById("scroll");
        scroll!.scrollTop = scroll?.scrollHeight || 0;
    }

    const diceMessage = (p: LogEntry & { kind: "dice" }) =>
        `<b>${p.player}</b> a jeté un dé ${p.max} et obtenu <b>${p.value}</b>`;

    const textMessage = (p: LogEntry & { kind: "text" }) =>
        `<b>${p.player}</b>:&nbsp;`;

    const throwDices = () => {
        for (let i = 0; i < nbThrows; i++){
            //TODO: Have this calculation on the back side?
            const entry: LogEntry = {
                kind: "dice",
                player: "Pepo", //TODO: Change this to actual player
                value: Math.ceil(Math.random() * nbFaces),
                max: nbFaces,
                date: Date(),
                id: Math.floor(Math.random() * 2048)
            };
            logs.push(entry);
            logs = logs; // trigger Svelte reactivity
        }
        nbThrows = 1
        nbFaces = 100
        tick().then(() => {
				goToLastLog()
		});
    }

    const sendMessage = () => {
        if(chatInput === "") return
        
        //TODO: Have this calculation on the back side?
        const entry: LogEntry = {
            kind: "text",
            player: "Pepo", //TODO: Change this to actual player
            message: chatInput,
            date: Date(),
            id: Math.floor(Math.random() * 2048)
        };
        logs.push(entry);
        logs = logs; // trigger Svelte reactivity
        chatInput = ""
        tick().then(() => {
				goToLastLog()
		});
    }

    //TODO: Makes this function based on actual ID and backend
    const deleteLog = (logIDToDelete: number) => {
        for(let i = 0; i < logs.length; i++){
            if(logs[i].id == logIDToDelete){
                logs.splice(i, 1)
                logs = logs; // trigger Svelte reactivity
                return
            }
        }
    }

    let currentlyShowingInput: boolean = true;
</script>

<div class="tab-zone">
    <ul id="scroll" class="list bg-base-100 rounded-box shadow-md h-140 overflow-y-scroll">
    {#each logs as log, i (log.id)}
        {#if log.kind === "dice"}
        <ChatLog
            htmlMessage={diceMessage(log)}
            message=""
            date={log.date.substring(0, 25)}
            showDeleteButton={true}
            deleteCallback={() => {deleteLog(log.id)}}
        />
        {:else}
        <ChatLog
            htmlMessage={textMessage(log)}
            message={log.message}
            date={log.date.substring(0, 25)}
            showDeleteButton={true}
            deleteCallback={() => {deleteLog(log.id)}}
        />
        {/if}
    {/each}
    </ul>
    <div class="flex items-center gap-2 mt-5">
        {#if currentlyShowingInput}
            <button class="btn btn-square btn-ghost shrink-0 h-10 text-xs" title="goToThrowDice" onclick={() => {currentlyShowingInput = false}}>
                <DiceIcon viewBoxX={700} viewBoxY={500} color={"white"}/>
            </button>
            <input
                bind:value={chatInput}
                id="chatInput"
                type="text"
                placeholder="Envoyer un message"
                class="input flex-1 min-w-0"
            />
            <button class="btn btn-square btn-ghost shrink-0 h-10 text-xs" title="sendMessage" onclick={() => {sendMessage()}}>
                <ThrowIcon viewBoxX={24} viewBoxY={24} color={"white"}/>
            </button>
        {:else}
            <button class="btn btn-square btn-ghost shrink-0 h-10 text-xs" title="goToSendMessage" onclick={() => {currentlyShowingInput = true}}>
                <InputIcon viewBoxX={40} viewBoxY={24} color={"white"}/>
            </button>
            <div class="flex-1"></div>
            <p>Lancer</p>
            <input
                bind:value={nbThrows}
                type="text"
                placeholder="Nombre de dés"
                title="Dés"
                class="input flex-1 min-w-0"
            />
            <p>Dé</p>
            <input
                bind:value={nbFaces}
                type="text"
                placeholder="Nombre de faces"
                title="Faces"
                class="input flex-1 min-w-0"
            />
            <div class="flex-1"></div>
            <button class="btn btn-square btn-ghost shrink-0 h-10 text-xs" title="throwDice" onclick={() => {throwDices()}}>
                <ThrowIcon viewBoxX={24} viewBoxY={24} color={"white"}/>
            </button>
        {/if}
    </div>
</div>


<style>
    .tab-zone{
        min-width: 510px;
    }
</style>