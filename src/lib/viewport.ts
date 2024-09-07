import * as PIXI from 'pixi.js';
import type { Canvas } from './canvas';

interface ViewportOptions {
	canvas: Canvas;
}

export class Viewport extends PIXI.Container {
	private vp_scale: number = 1;
	private canvas: Canvas;

	public constructor(options: ViewportOptions) {
		super({
			height: window.innerHeight,
			width: window.innerWidth
		});

		this.canvas = options.canvas;

		this.addListeners();
		this.eventMode = 'static';
	}

	public setScale(scale: number) {
		this.vp_scale = scale;
		for (const child of this.children) {
			if (child instanceof PIXI.Text) {
				child.style.fontSize = 100 * this.vp_scale;
			}
		}
	}

	private addListeners() {
		let isPointerDown = false;
		this.canvas.app?.canvas.addEventListener('wheel', (e) => {
			if (e.deltaY < 0) {
				this.setScale(this.vp_scale * 1.1);
			} else {
				this.setScale(this.vp_scale / 1.1);
			}
		});
		this.canvas.app?.canvas.addEventListener('pointerup', () => {
			isPointerDown = false;
		});
		this.canvas.app?.canvas.addEventListener('pointerdown', () => {
			isPointerDown = true;
		});
		this.canvas.app?.canvas.addEventListener('pointermove', (e) => {
			if (!isPointerDown) return;
			this.position.x += e.movementX;
			this.position.y += e.movementY;
		});
	}
}
