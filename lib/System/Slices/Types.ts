export type IListOption = {
  value: string;
  label: string;
};

export type IQueryFilterBuilder = {
  value?: any;
  label?: string;
  placement?: "InLine" | "InPopup" | "Auto";
  isMain?: boolean;
} & (
  | {
      id: string;
      Element?: React.FC<any>;
      type: FilterType | (string & {});
    }
  | {
      id: string;
      type: "text" | "number" | "boolean" | "DateTime" | "Date" | "Time";
    }
  | {
      id: string;
      type: "selector";
      options: IListOption[];
      getOptions?: () => Promise<IListOption[]>;
    }
  | {
      type: "string-selector" | "number-selector";
      selectorId: string;
      inputId: string;
      options: IListOption[];
    }
  | {
      type: "Date" | "Time" | "DateTime";
      max?: string;
      min?: string;
    }
  | PaginatorFilterBuilder
  | {
      type: string;
      [key: string]: any;
    }
);

type FilterType =
  | "hidden"
  | "text"
  | "number"
  | "DateTime"
  | "Date"
  | "Time"
  | "boolean"
  | "selector"
  | "string-selector"
  | "number-selector"
  | "selector-api"
  | "multi-selector";

export type PaginatorFilterBuilder = {
  type: "selector-api";
} & any;
