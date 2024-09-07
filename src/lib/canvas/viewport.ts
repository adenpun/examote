import * as PIXI from 'pixi.js';
import type { AppCanvas } from './canvas.svelte';
import { Text } from './text.svelte';

interface ViewportOptions {
	appCanvas: AppCanvas;
}

export class Viewport extends PIXI.Container {
	private vp_scale: number = 1;
	private appCanvas: AppCanvas;

	public constructor(options: ViewportOptions) {
		super({
			height: window.innerHeight,
			width: window.innerWidth
		});

		this.appCanvas = options.appCanvas;

		this.addListeners();
		this.eventMode = 'static';
	}

	public setScale(scale: number) {
		this.vp_scale = scale;
		for (const child of this.children) {
			if (child instanceof Text) {
				child.style.fontSize = 100 * this.vp_scale;
			}
		}
	}

	private addListeners() {
		let isPointerDown = false;
		this.appCanvas.app?.canvas.addEventListener('wheel', (e) => {
			const scale = e.deltaY < 0 ? 1.1 : 1 / 1.1;
			this.setScale(this.vp_scale * scale);
			this.position.x = e.clientX - (e.clientX - this.position.x) * scale;
			this.position.y = e.clientY - (e.clientY - this.position.y) * scale;
		});
		this.appCanvas.app?.canvas.addEventListener('pointerup', () => {
			isPointerDown = false;
		});
		this.appCanvas.app?.canvas.addEventListener('pointerdown', () => {
			isPointerDown = true;
		});
		this.appCanvas.app?.canvas.addEventListener('pointermove', (e) => {
			if (!isPointerDown) return;
			this.position.x += e.movementX;
			this.position.y += e.movementY;
		});
	}
}
