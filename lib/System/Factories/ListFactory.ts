import { createFactory } from "./FactoryPackage";
import { FilterDefinition, QueryComponentMap } from "../Slices/Query/Types";
import { StatusSlice } from "../Slices/Status/StatusSlice";
import { StatusSliceConfig } from "../Slices/Status/Types";
import { QuerySlice } from "../Slices/Query/QuerySlice";
import { PaginatorSlice } from "../Slices/Paginator/PaginatorSlice";
import { PaginatorProps } from "../Slices/Paginator/Types";
import { DefaultComponentMap } from "../Constants/QueryDefaults";
import { DefaultStatusKit } from "../Constants/StatusDefaults";

type DefaultMap = typeof DefaultComponentMap;
type MergedMap<M extends QueryComponentMap> = DefaultMap & M;
type DefaultStatusMap = typeof DefaultStatusKit;

export function createListFactory<
  P extends {
    load: (...args: any[]) => Promise<any>;
    reload: (...args: any[]) => Promise<any>;
    loadMore: () => Promise<any>;
    hasMore: boolean;
    limit: number;
  },
  R = Awaited<ReturnType<P["load"]>>,
  Fmt = undefined,
  M extends QueryComponentMap = {},
  F extends Record<string, FilterDefinition<MergedMap<M>>> = Record<string, FilterDefinition<MergedMap<M>>>,
  SK extends Record<string, any> = {}
>(config: {
  query?: {
    componentMap?: M;
    filters: F;
    validators?: any[];
    onQueryChange?: (query: any) => void;
    syncWithRouter?: boolean;
  };
  paginator: PaginatorProps<P, R, Fmt, any>;
  status?: Omit<Partial<StatusSliceConfig<DefaultStatusMap & SK>>, "statusKit"> & { statusKit?: SK };
}) {
  type MergedComponentMap = MergedMap<M>;
  const componentMap = { ...DefaultComponentMap, ...config.query?.componentMap } as MergedComponentMap;
  const queryConfig = config.query ? { ...config.query, componentMap } : undefined;

  const statusConfig = config.status ? { ...config.status, statusKit: { ...DefaultStatusKit, ...config.status.statusKit } } : { statusKit: DefaultStatusKit };

  return createFactory().use(StatusSlice(statusConfig as any)).use(QuerySlice(queryConfig!)).use(PaginatorSlice<P, R, Fmt>(config.paginator));
}
