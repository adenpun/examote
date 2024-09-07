export type LooseAutocomplete<Types extends BaseType, BaseType extends string> =
	| Types
	| Omit<BaseType, Types>;
