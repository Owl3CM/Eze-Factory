import { SliceFactory } from "./types";

export function createFactory() {
  return new FactoryBuilder<{}>({});
}

class FactoryBuilder<Ctx> {
  constructor(private ctx: Ctx) {}

  use<Add>(factory: SliceFactory<Ctx, Add>) {
    const slice = factory(this.ctx);
    return new FactoryBuilder<Ctx & Add>({
      ...this.ctx,
      ...slice,
    });
  }

  build(): Ctx {
    return this.ctx;
  }
}
