import { ComponentProps } from "react";
import { IHive } from "../../../Hives";
export type ParrotKey = string;

export type QueryComponentMap = Record<string, React.FC<any>>;

type CommonFilterProps = {
  label?: ParrotKey;
  placement?: "InLine" | "InPopup" | "Auto";
  isMain?: boolean;
  value?: any;
};

export type FilterDefinition<M extends QueryComponentMap = any> = {
  [K in keyof M]: { type: K } & Omit<ComponentProps<M[K]>, keyof CommonFilterProps | "queryBuilder" | "id"> & CommonFilterProps;
}[keyof M];

export type IdOf<F extends Record<string, any>> = Extract<keyof F, string>;
export type QueryRecord<F extends Record<string, any>> = {
  [K in keyof F]?: any;
};

export interface QueryValidator<F extends Record<string, any>> {
  <K extends keyof F>(key: K, value: any): boolean | string;
}

export interface QuerySliceConfig<M extends QueryComponentMap = any, F extends Record<string, FilterDefinition<M>> = any> {
  componentMap: M;
  filters: F;
  validators?: Array<QueryValidator<F>>;
  onQueryChange?: (query: QueryRecord<F>) => void;
  syncWithRouter?: boolean;
}

export interface QueryAPI<M extends QueryComponentMap = any, F extends Record<string, FilterDefinition<M>> = any> {
  filters: F;
  queryHive: IHive<QueryRecord<F>>;
  getParam: <K extends IdOf<F>>(key: K) => any;
  getQuery: () => QueryRecord<F>;
  setQuery: (q: QueryRecord<F>) => void;
  updateQuery: <K extends IdOf<F>>(patch: { id: K; value: any }) => boolean;
  removeParam: (key: IdOf<F>) => void;
  clearQuery: () => void;
  listenToQuery: (cb: (q: QueryRecord<F>) => void) => () => void;
  componentMap: M;
  getFilterComponent: (type: keyof M) => React.FC<any>;
}
