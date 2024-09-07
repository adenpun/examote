import * as PIXI from 'pixi.js';
import { makeSelectable } from './selectable';
import type { AppCanvas } from './canvas.svelte';
import type { IProperties, PropertyTypes, AllTypes } from './properties';

interface TextOptions extends PIXI.TextOptions {
	appCanvas: AppCanvas;
}

interface Props {
	text: string;
	visible: boolean;
}

export class Text<T> extends PIXI.Text implements IProperties<Props> {
	public appCanvas: AppCanvas;
	public properties: Props = $state({
		text: 'Text',
		visible: true
	});
	public propertyTypes: PropertyTypes<Props> = {
		text: 'string',
		visible: 'boolean'
	};

	public constructor(options: TextOptions) {
		const { appCanvas, ...rest } = options;
		super(rest);
		this.appCanvas = appCanvas;
		this.style.fontFamily = ['Virgil', 'Arial', 'sans-serif'];
		this.properties.text = this.text;
		const cleanup = $effect.root(() => {
			$effect(() => {
				this.text = this.properties.text;
			});
			$effect(() => {
				this.visible = this.properties.visible;
			});
		});
		makeSelectable(this);
	}
}
