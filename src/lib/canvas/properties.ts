import type { LooseAutocomplete } from './types';

export type LiteralType = string | number | boolean | unknown[] | Record<string, unknown>;
export type LiteralTypeStrings = 'number' | 'string' | 'boolean' | 'array' | 'object';
export type AllTypes = LooseAutocomplete<LiteralTypeStrings, any>;
export type PropertyTypes<T extends Record<string, any>> = {
	[k in keyof T]: T[k] extends LiteralType ? TypeToTypeStringConstant<T[k]> : any;
};
type TypeStringConstantToType<T extends LiteralTypeStrings> = {
	string: string;
	number: number;
	boolean: boolean;
	array: unknown[];
	object: Record<string, unknown>;
}[T];
export type TypeToTypeStringConstant<T> = T extends string
	? 'string'
	: T extends number
		? 'number'
		: T extends boolean
			? 'boolean'
			: T extends Array<any>
				? 'array'
				: T extends Record<string, unknown>
					? 'object'
					: never;

export interface IProperties<T extends Record<string, any>> {
	properties: T;
	propertyTypes: PropertyTypes<T>;
}
