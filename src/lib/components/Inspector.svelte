<script lang="ts">
	import type { AppCanvas } from '$lib/canvas/canvas.svelte';

	interface Props {
		appCanvas: AppCanvas;
	}

	let { appCanvas }: Props = $props();

	const selectedProps = $derived.by(() => {
		if (!appCanvas.selected) return {};
		return appCanvas.selected.properties;
	});
	const selectedPropTypes = $derived.by(() => {
		if (!appCanvas.selected) return {};
		return appCanvas.selected.propertyTypes;
	});
</script>

<div class="inspector">
	{#if appCanvas.selected}
		{#each Object.entries(selectedProps) as [propName, propValue]}
			<div class="property">
				<label for={propName}>{propName}</label>
				<div>
					{#if selectedPropTypes[propName] === 'string'}
						<input type="text" id={propName} bind:value={selectedProps[propName]} />
					{:else if selectedPropTypes[propName] === 'boolean'}
						<input type="checkbox" id={propName} bind:checked={selectedProps[propName]} />
					{:else if selectedPropTypes[propName] === 'number'}
						<input type="number" id={propName} bind:value={selectedProps[propName]} />
					{/if}
				</div>
			</div>
		{/each}
	{:else}
		<div>No object selected</div>
	{/if}
</div>

<style>
	.inspector {
		position: absolute;
		background-color: white;
		overflow: auto;
		height: 75%;
		top: 50%;
		transform: translateY(-50%);
		padding: 10px;
		border-radius: 5px;
	}
	.property {
		display: flex;
	}
</style>
