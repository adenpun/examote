import * as PIXI from 'pixi.js';
import { Viewport } from './viewport';

export class Canvas {
	public app: PIXI.Application | null = null;
	public viewport: Viewport | null = null;

	public async init(canvas: HTMLCanvasElement) {
		this.app = new PIXI.Application();
		await this.app.init({
			canvas,
			height: window.innerHeight,
			width: window.innerWidth
		});
		(globalThis as any).__PIXI_APP__ = this.app;
		this.viewport = new Viewport({
			canvas: this
		});

		this.app.stage.addChild(this.viewport);

		window.addEventListener('resize', () => {
			this.app?.renderer.resize(window.innerWidth, window.innerHeight);
		});
	}

	public async addBox(text: string) {
		if (!this.app) return;

		const component = new PIXI.Text({
			text,
			style: {
				fill: 0xffffff,
				fontSize: 100
			}
		});
		this.viewport?.addChild(component);

		return component;
	}
}

export const canvas = new Canvas();
