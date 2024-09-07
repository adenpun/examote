import * as PIXI from 'pixi.js';
import { Viewport } from './viewport';
import { initDevtools } from '@pixi/devtools';
import { Text } from './text.svelte';
import type { IProperties } from './properties';

type Events = 'scenetreechanged';

export class AppCanvas extends PIXI.EventEmitter<Events> {
	public app: PIXI.Application;
	public selected: (PIXI.Container & IProperties<any>) | null = $state(null);
	public viewport?: Viewport;

	public constructor() {
		super();
		this.app = new PIXI.Application();
		PIXI.Assets.load('Virgil.woff2');
	}

	public async init(canvas: HTMLCanvasElement) {
		await this.app.init({
			canvas,
			height: window.innerHeight,
			width: window.innerWidth
		});

		initDevtools(this.app);

		this.viewport = new Viewport({
			appCanvas: this
		});

		this.app.stage.addChild(this.viewport);

		window.addEventListener('resize', () => {
			this.app?.renderer.resize(window.innerWidth, window.innerHeight);
		});

		this.emit('scenetreechanged');
	}

	public async addBox(text: string) {
		if (!this.app) return;

		const component = new Text({
			appCanvas: this,
			text,
			style: {
				fill: 0xffffff,
				fontSize: 100
			}
		});
		this.emit('scenetreechanged');
		this.viewport?.addChild(component);

		return component;
	}
}

export const canvas = new AppCanvas();
