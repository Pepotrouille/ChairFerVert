<script lang="ts">
  import {onMount} from "svelte"
	// Create a WebSocket connection to the server
        let socket: any;
        let inputText: any;
        let submitButton: any;

        onMount(() => {
          socket  = new WebSocket('ws://127.0.0.1:8000/ws');
          inputText = document.getElementById("inputText");
          submitButton = document.getElementById("submitButton");
        

          // Event handler for when the connection is established
          socket.addEventListener('open', (event: any) => {
              showMessage('Connected to server.');
          });

          // Event handler for receiving messages from the server
          socket.onmessage = (event: any) => {
              showMessage("You sent : " + event.data)
          }

          // Event handler for when the connection is closed
          socket.addEventListener('close', (event: any) => {
              showMessage('Connection closed.');
          });

          submitButton.addEventListener("click", function() {
              const inputValue = inputText?.value;
              socket.send(inputValue)
              inputText.value = ""
          });
        });

        // Function to display messages on the web page
        function showMessage(message: string) {
            const messageContainer = document.getElementById('container');
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageContainer!.appendChild(messageElement);
        }


</script>

<main>
    <a href="/">Back</a>
    <div class="w-full">
      <h1>GFG WebSocket Example</h1>
      <input
        id="inputText"
        type="text"
        placeholder="Envoyer un message"
        class="input flex-1 min-w-0"
      />
      <button class="btn" id="submitButton">Submit</button>
      <div id="container"></div>
    </div>
</main>
