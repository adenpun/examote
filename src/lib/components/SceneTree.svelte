<script lang="ts">
	import type { AppCanvas } from '$lib/canvas/canvas.svelte';
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';

	interface Props {
		appCanvas: AppCanvas;
	}

	let { appCanvas }: Props = $props();
	let tree: any = $state(appCanvas.app.stage);
	onMount(() => {
		appCanvas.on('scenetreechanged', () => {
			tree = appCanvas.app.stage.children[0];
			console.log(tree);
		});
	});
</script>

<div class="tree">
	{@render item(tree)}
</div>

{#snippet item(container: PIXI.Container)}
	{#if container.children.length > 0}
		<details>
			<summary>{container.constructor.name}</summary>
			{#each container.children as child}
				{@render item(child)}
			{/each}
		</details>
	{:else}
		<div>{container.constructor.name}</div>
	{/if}
{/snippet}

<style>
	.tree {
		position: absolute;
		right: 0;
		background-color: white;
		overflow: auto;
		height: 75%;
		top: 50%;
		transform: translateY(-50%);
		padding: 10px;
		border-radius: 5px;
	}
</style>
