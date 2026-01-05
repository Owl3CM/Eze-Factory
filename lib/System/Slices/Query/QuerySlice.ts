import { QueryMechanics } from "./QueryMechanics";
import { FilterDefinition, IdOf, QueryAPI, QueryComponentMap, QueryRecord, QuerySliceConfig } from "./Types";

export function QuerySlice<M extends QueryComponentMap, F extends Record<string, FilterDefinition<M>>>(config: QuerySliceConfig<M, F>) {
  return (_: any): { query: QueryAPI<M, F> } => {
    if (!config?.filters) return {} as any;
    type K = IdOf<F>;
    type Q = QueryRecord<F>;

    const hive = QueryMechanics.createHive(config as any);

    const setQuery = (q: Q) => QueryMechanics.setQuery(hive, q, config as any);

    const updateQuery = <K extends IdOf<F>>(patch: { id: K; value: any }): boolean => {
      return QueryMechanics.updateQuery(hive, patch, config as any);
    };

    const removeParam = (key: K) => QueryMechanics.removeParam(hive, key, config as any);

    const clearQuery = () => setQuery({} as Q);
    const listenToQuery = (cb: (q: Q) => void) => {
      cb(hive.honey);
      return hive.subscribe(cb);
    };

    const componentMap = config.componentMap;

    const getFilterComponent = (type: keyof M) => {
      return componentMap[type];
    };

    return {
      query: {
        filters: config.filters,
        queryHive: hive,
        getParam: <K extends IdOf<F>>(key: K) => hive.honey?.[key],
        getQuery: () => hive.honey,
        setQuery,
        updateQuery,
        removeParam,
        clearQuery,
        listenToQuery,
        componentMap,
        getFilterComponent,
      },
    };
  };
}
