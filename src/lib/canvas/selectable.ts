import * as PIXI from 'pixi.js';
import { AppCanvas } from './canvas.svelte';
import type { IProperties } from './properties';

export function makeSelectable(container: PIXI.Container & IProperties<any>) {
	container.on('click', (e) => {
		e.stopPropagation();
		if ('appCanvas' in container && container.appCanvas instanceof AppCanvas) {
			container.appCanvas.selected = container;
		}
	});
	container.eventMode = 'static';
}
