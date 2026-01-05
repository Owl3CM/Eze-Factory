import { PaginatorAPI } from "../Slices/Paginator/Types";
import { StatusAPI } from "../Slices/Status/Types";
import { IQueryFilterBuilder } from "../Slices/Types";
import { TableAPI } from "../Slices/Table/Types";
import { ExporterAPI } from "../Slices/Exporter/Types";
import { LoaderAPI } from "../Slices/Loader/Types";
import { QueryAPI } from "../Slices/Query/Types";

export interface IPaginatorFactory<T> {
  paginator: PaginatorAPI<T>;
}

export interface ILoaderFactory<Response> {
  loader: LoaderAPI<Response>;
}

export interface IStatusFactory {
  status: StatusAPI;
}

export interface IQueryFactory<F extends readonly IQueryFilterBuilder[]> {
  // @ts-ignore
  query: QueryAPI<F>;
}

export interface ITableFactory<T> {
  table: TableAPI<T>;
}

export interface IExporterFactory {
  exporter: ExporterAPI;
}
