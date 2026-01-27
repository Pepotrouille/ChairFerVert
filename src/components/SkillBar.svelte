<script lang='ts'>
    export let name: string;
    export let value: number;
    export let color: string;
</script>

<div class="flex items-center gap-2">
    <p class="w-50 text-right">{name}</p>
    <progress class={`progress progress-${color} min-w-25`} value={value} max="100"></progress>
    <p class="w-10 text-left">{value}</p>
</div>

<!--
Leave this comment to load the colors with DaisyUI
progress-error
progress-success
progress-info
progress-warning
-->