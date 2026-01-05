import { Filters } from "./Filters";
import { ObserverBee } from "../../../../Bees";
import { IQueryFactory } from "../../../Factories/Types";
import React from "react";

type Props = {
  factory: IQueryFactory<any>;
  children?: any;
  filterClass?: string;
};

const QueryContainer = ({ children, factory }: Props) => {
  return (
    <>
      <ObserverBee
        hive={factory.query.queryHive}
        Component={({ honey }) => {
          return (
            <div className="query-container gap-lg">
              <Filters querySlice={factory.query} />
              {/* <Sorts factory={factory} /> */}
              {children}
            </div>
          );
        }}
      />
      {/* <div className="query-container gap-lg">
        <Filters service={service} queryBuilder={queryBuilder} filterClass={filterClass} />
        <Sorts service={service} queryBuilder={queryBuilder} />
        {children}
      </div> */}
      {/* <div className="row gap-lg">
        {Object.entries(params).map(([key, value]: any) => {
          return (
            <IconButton
              icon="close-outline"
              onTransitionEnd={(target) => {
                queryBuilder.updateQueryParams({ id: key, value: undefined });
              }}
              onClick={({ e, setState, state }) => {
                if (state === "fade-out") return;
                setState("fade-out");
                // setTimeout(() => {
                // }, 200);
              }}
              key={key}
              customLabel={`${GetLabel(key)} : ${value}`}
            />
          );
        })}
      </div> */}
    </>
  );
};

export default QueryContainer;
