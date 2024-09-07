<script lang="ts">
	import { onMount } from 'svelte';
	import { canvas as appCanvas } from '$lib/canvas/canvas.svelte';
	import Inspector from '$lib/components/Inspector.svelte';
	import SceneTree from '$lib/components/SceneTree.svelte';

	let canvas: HTMLCanvasElement;
	onMount(async () => {
		await appCanvas.init(canvas);
		await appCanvas.addBox('asd');
	});
</script>

<Inspector {appCanvas} />
<SceneTree {appCanvas} />
<canvas bind:this={canvas}></canvas>
