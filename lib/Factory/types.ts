// Extract the config type from a slice creator
export type SliceConfig<SliceCreator> = SliceCreator extends (config?: infer C) => any ? C : never;
//! make the ctx take partial slice with the needed functions
// A slice factory returns a slice builder
export type SliceFactory<Ctx, Add> = (ctx: Ctx) => Add;
