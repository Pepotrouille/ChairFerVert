<script lang="ts">
    import { onMount, tick } from "svelte";
    import ChatLog from "./ChatLog.svelte";
    import DiceIcon from "./svg_icons/DiceIcon.svelte";
    import InputIcon from "./svg_icons/InputIcon.svelte";
    import ThrowIcon from "./svg_icons/ThrowIcon.svelte";
    import type { Player, Message, MessageCreate, DiceLog, DiceLogCreate } from "../models/models.ts"

    let chatInput: string = ""
    let nbThrows: number = 1
    let nbFaces: number = 100

    //TODO: Get logs from DB
    let logs: any[] = [];
    let player: Player
    
	onMount(() => {
        document.getElementById("chatInput")?.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage()
            }
        }); 
        loadPlayer().then((loadedPlayer: Player)=>{
            player = loadedPlayer 
            reloadLogs()
        })
        
        
	});

    //TEMP
    async function loadPlayer(): Promise<Player> {
        const res = await fetch('http://localhost:8000/players/1')
        const loadedPlayer = await res.json()
        return loadedPlayer as Player
    }
    async function loadMessages(): Promise<Message[]> {
        const res = await fetch('http://localhost:8000/messages')
        const messagesJSON = await res.json()
        const messages: Message[] = []
        if (messagesJSON){
            messagesJSON.forEach((mJSON: any) => {
                messages.push(mJSON as Message)
            });
        }
        return messages
    }
    async function loadDiceLogs(): Promise<DiceLog[]> {
        const res = await fetch('http://localhost:8000/dice-logs')
        const diceLogsJSON = await res.json()
        const diceLogs: DiceLog[] = []
        if (diceLogsJSON){
            diceLogsJSON.forEach((dlJSON: any) => {
                diceLogs.push(dlJSON as DiceLog)
            });
        }
        return diceLogs
    }
    async function reloadLogs() {
        const loadedMessages: Message[] = await loadMessages()
        const loadedDiceLogs: DiceLog[] = await loadDiceLogs()
        logs = [...loadedMessages, ...loadedDiceLogs]
        logs.sort((l1: any, l2: any)=>{return ((l1.base_log.date < l2.base_log.date)? -1:1)})
        goToLastLog()
    }
    
  async function createDiceLog(dlData: DiceLogCreate) {
    const response = await fetch("http://localhost:8000/dice-logs", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dlData)
    });
    if (!response.ok) {
      throw new Error(`The dice log was not created: ${response.statusText}`);
    }
    const newDiceLog = await response.json();
    reloadLogs()
    return newDiceLog
  }
  async function createMessage(mData: MessageCreate) {
    const response = await fetch("http://localhost:8000/messages", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(mData)
    });
    if (!response.ok) {
      throw new Error(`The message was not created: ${response.statusText}`);
    }
    const newMessage = await response.json();
    reloadLogs()
    return newMessage
  }

    const goToLastLog = () => {
        let scroll=document.getElementById("scroll");
        scroll!.scrollTop = scroll?.scrollHeight || 0;
    }

    const diceMessage = (p: DiceLog) =>
        `<b>${p.base_log.player.name}</b> a jeté un dé ${p.max} et obtenu <b>${p.value}</b>`;

    const textMessage = (p: Message) =>
        `<b>${p.base_log.player.name}</b>:&nbsp;`;

    const throwDices = async () => {
        for (let i = 0; i < nbThrows; i++){
            //TODO: Have this calculation on the back side?
            const dlData: DiceLogCreate = {
                player_id: player.id,
                value: Math.ceil(Math.random() * nbFaces),
                max: nbFaces,
            };
            await createDiceLog(dlData)
            logs = logs; // trigger Svelte reactivity
        }
        nbThrows = 1
        nbFaces = 100
        tick().then(() => {
				goToLastLog()
		});
    }

    const sendMessage = async () => {
        if(chatInput === "") return
        
        //TODO: Have this calculation on the back side?
        const mData: MessageCreate = {
            player_id: player.id,
            content: chatInput,
        };
        await createMessage(mData)
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
                logs.splice(i, 1) // TODO
                logs = logs; // trigger Svelte reactivity
                return
            }
        }
    }

    let currentlyShowingInput: boolean = true;
</script>

<div class="tab-zone">
    <ul id="scroll" class="list bg-base-100 rounded-box shadow-md h-140 overflow-y-scroll">
    {#each logs as log, i (log.base_log.id)}
        {#if log.content}
        <ChatLog
            htmlMessage={textMessage(log)}
            message={log.content}
            date={log.base_log.date.substring(0,14)}
            showDeleteButton={true}
            deleteCallback={() => {deleteLog(log.base_log.id)}}
        />
        {:else}
        <ChatLog
            htmlMessage={diceMessage(log)}
            message=""
            date={log.base_log.date.substring(0,14)}
            showDeleteButton={true}
            deleteCallback={() => {deleteLog(log.base_log.id)}}
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