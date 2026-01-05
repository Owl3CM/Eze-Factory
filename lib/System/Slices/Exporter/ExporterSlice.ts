import { ExporterMechanics } from "./ExporterMechanics";
import { ExporterAPI, ExporterDependencies, ExporterSliceConfig } from "./Types";

export function ExporterSlice<TItem = any>(config: ExporterSliceConfig<TItem> = {}) {
  return (ctx: any): { exporter: ExporterAPI } => {
    // Runtime: ctx will have at least table, and either paginator or loader
    const deps = ctx as ExporterDependencies<TItem>;

    async function download(opts: { type: "csv" | "excel" }) {
      await ExporterMechanics.download(config, deps, opts);
    }

    return {
      exporter: { download },
    };
  };
}
