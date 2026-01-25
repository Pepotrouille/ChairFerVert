<script lang="ts">
  export let htmlMessage: string = "<b>Test</b>";
  export let message: string = "Test";
  export let date: string = "25/01/2025";
  export let showDeleteButton: boolean = false;
  export let deleteCallback: Function = () => {};
</script>

<li class="list-row flex flex-col gap-1">
  <div class="row-date flex justify-end text-sm text-gray-500">
    {date}
  </div>
  <div class="row-content flex items-center justify-between gap-2">
    <p class="text-left">{@html htmlMessage} {message}</p>
    {#if showDeleteButton}
      <button class="btn btn-square btn-ghost shrink-0 h-5 w-5 text-xs" title="deleteButton" onclick={() => {deleteCallback()}}>
        X
      </button>
    {/if}
  </div>
</li>