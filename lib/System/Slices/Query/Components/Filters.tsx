// import { Icon } from "@/Assets";
// import { IconButton } from "@/Elements";
// import { Popup, PopupMe } from "@/Libs/eze-spark";
// import ScreenProvider from "@/Capacitor/ScreenProvider/ScreenProvider";
// import { FilterDefinition, QueryAPI } from "@/System/Slices/Query/Types";

import { QueryAPI } from "../Types";
import React from "react";

type Props = {
  querySlice: QueryAPI<any>;
  filterClass?: string;
};

export const Filters = ({ querySlice, filterClass }: Props) => {
  const outOfPopupFilters: any[] = [];
  const inPopupFilters: any[] = [];

  Object.entries(querySlice.filters).forEach(([id, filter]: [string, any]) => {
    if (filter.type === "hidden") return;
    const filterWithId = { ...filter, id };
    // if (ScreenProvider.isAboveMobile()) {
    if (true) {
      if (filter.placement === "InPopup") inPopupFilters.push(filterWithId);
      else outOfPopupFilters.push(filterWithId);
    } else {
      if (filter.isMain) outOfPopupFilters.push(filterWithId);
      else inPopupFilters.push(filterWithId);
    }
  });

  return (
    <>
      {inPopupFilters.length > 0 && (
        <div className="col" onClick={({ currentTarget: target }) => PopupFilter({ target, factory: querySlice, filters: inPopupFilters, filterClass })}>
          {/* <Icon icon="filter-outline" className="p-xl m-auto round-md shadow-md bg-dark shadow-md fill-owl" /> */}
          <p>Filters</p>
        </div>
      )}
      {outOfPopupFilters.map(({ type, id, ...props }, i) => {
        const Component = querySlice.getFilterComponent(type);
        return <Component key={id} queryBuilder={querySlice} id={id} {...props} />;
      })}
    </>
  );
};

type FiltersContentProps = {
  factory: QueryAPI<any>;
  filters: any[];
  [key: string]: any;
};

const FiltersContent = ({ factory: querySlice, filters, popup }: FiltersContentProps) => {
  return (
    <div className="col gap-lg">
      <div className="row-center gap-lg">
        {/* <IconButton
          label="close"
          variant="outline"
          icon="close-outline"
          containerClass="mx-auto"
          onClick={() => {
            popup.remove();
          }}
        />
        <IconButton
          label="cancelFilters"
          variant="danger"
          icon="trash-outline"
          containerClass="mx-auto"
          onClick={() => {
            const params = querySlice.getQuery();
            filters.forEach((filter: any) => {
              if (filter.type === "string-selector" || filter.type === "number-selector") {
                delete params[filter.inputId];
                delete params[filter.selectorId];
              } else delete params[filter.id];
            });
            querySlice.setQuery(params);
            popup.remove();
          }}
        /> */}
      </div>
      {filters.map(({ type, id, ...props }, i) => {
        const Component = querySlice.getFilterComponent(type);
        return <Component key={id} queryBuilder={querySlice} id={id} {...props} />;
      })}
    </div>
  );
};

type PopupFilterProps = {
  target: HTMLElement;
  factory: QueryAPI<any>;
  filters: any[];
  filterClass?: string;
};

const PopupFilter = ({ target, factory, filters, filterClass }: PopupFilterProps) => {
  // const id = "filters";
  // if (Popup.getPopup(id)) {
  //   return Popup.remove(id);
  // }
  // const popupOptions: any = {
  //   id,
  //   componentProps: { factory, filters } as FiltersContentProps,
  //   childClass: "popup-filter" + (filterClass ? ` ${filterClass}` : ""),
  // };
  // if (ScreenProvider.isAboveMobile()) {
  //   // popupOptions.target = target;
  // } else {
  //   popupOptions.animation = "height";
  //   popupOptions.placement = "bottom";
  //   popupOptions.overlay = true;
  // }
  // PopupMe(FiltersContent, popupOptions);
};
