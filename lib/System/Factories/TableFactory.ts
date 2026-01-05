import { createFactory } from "./FactoryPackage";
import { FilterDefinition, QueryComponentMap } from "../Slices/Query/Types";
import { StatusSlice } from "../Slices/Status/StatusSlice";
import { StatusSliceConfig } from "../Slices/Status/Types";
import { QuerySlice } from "../Slices/Query/QuerySlice";
import { PaginatorSlice } from "../Slices/Paginator/PaginatorSlice";
import { PaginatorProps } from "../Slices/Paginator/Types";
import { TableSlice } from "../Slices/Table/TableSlice";
import { TableSliceConfig } from "../Slices/Table/Types";
import { ExporterSlice } from "../Slices/Exporter/ExporterSlice";
import { ExporterSliceConfig } from "../Slices/Exporter/Types";

import { ArrayElement } from "../Slices/Paginator/PaginatorMechanics";
import { DefaultComponentMap } from "../Constants/QueryDefaults";
import { DefaultStatusKit } from "../Constants/StatusDefaults";

type DefaultMap = typeof DefaultComponentMap;
type MergedMap<M extends QueryComponentMap> = DefaultMap & M;

type FactoryQueryConfig<M extends QueryComponentMap> = {
  componentMap?: M;
  filters: Record<string, FilterDefinition<MergedMap<M>>>;
  validators?: any[];
  onQueryChange?: (query: any) => void;
  syncWithRouter?: boolean;
};

export function createTableFactory<
  P extends {
    load: (...args: any[]) => Promise<any>;
    reload: (...args: any[]) => Promise<any>;
    loadMore: () => Promise<any>;
    hasMore: boolean;
    limit: number;
  },
  R = Awaited<ReturnType<P["load"]>>,
  Fmt = undefined,
  M extends QueryComponentMap = {}
>(config: {
  query?: FactoryQueryConfig<M>;
  paginator: PaginatorProps<P, R, Fmt, any>;
  status?: Partial<StatusSliceConfig>;
  table: TableSliceConfig<ArrayElement<Fmt extends undefined ? R : Fmt>>;
  exporter?: ExporterSliceConfig<ArrayElement<Fmt extends undefined ? R : Fmt>>;
}) {
  type Item = ArrayElement<Fmt extends undefined ? R : Fmt>;
  type MergedComponentMap = MergedMap<M>;
  const componentMap = { ...DefaultComponentMap, ...config.query?.componentMap } as MergedComponentMap;
  const queryConfig = config.query ? { ...config.query, componentMap } : undefined;

  const statusConfig = config.status ? { ...config.status, statusKit: { ...DefaultStatusKit, ...config.status.statusKit } } : { statusKit: DefaultStatusKit };

  return createFactory()
    .use(StatusSlice(statusConfig as any))
    .use(QuerySlice(queryConfig!))
    .use(PaginatorSlice<P, R, Fmt>(config.paginator))
    .use(TableSlice<Item>(config.table))
    .use(ExporterSlice<Item>({ ...(config.exporter ?? ({} as any)) }));
}
