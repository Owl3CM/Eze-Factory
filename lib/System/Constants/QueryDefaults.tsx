import React from "react";

const { CheckBoxQuery, DateQuery, InputWithSelectorQuery, MultiSelectorQuery, NumberQuery, PaginatorSelectorQueryLabeled, SelectorQuery, TextQuery } =
  {} as any;

export const DefaultComponentMap = {
  text: TextQuery,
  number: NumberQuery,
  boolean: CheckBoxQuery,
  selector: SelectorQuery,
  "multi-selector": MultiSelectorQuery,
  "string-selector": InputWithSelectorQuery,
  "number-selector": InputWithSelectorQuery,
  "selector-api": PaginatorSelectorQueryLabeled,
  Date: DateQuery,
  Time: DateQuery,
  DateTime: (props: any) => <DateQuery {...props} type="datetime-local" debounce={700} />,
  Float: NumberQuery,
  Int32: NumberQuery,
  hidden: () => <></>,
} as const;
