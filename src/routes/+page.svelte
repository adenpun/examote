<script lang="ts">
	import { onMount } from 'svelte';
	import { canvas as appCanvas } from '$lib/canvas';
	let canvas: HTMLCanvasElement;
	onMount(async () => {
		await appCanvas.init(canvas);
		await appCanvas.addBox('asd');
	});
</script>

<canvas bind:this={canvas}></canvas>
