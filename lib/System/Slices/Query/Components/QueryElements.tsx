import React from "react";
import { QueryAPI } from "../Types";

export interface IQueryProps {
  id: string;
  query: QueryAPI<any>;
  debounce?: number;
  [key: string]: any;
}

interface IQueryElementProps extends IQueryProps {
  Element: any;
}
interface IQueryElementLabeledProps extends IQueryElementProps {
  label?: any;
  customLabel?: string;
}

export const QueryElementLabeled = ({ id, no_label = false, query, label = id, customLabel, Element, debounce, ...props }: IQueryElementLabeledProps) =>
  !no_label ? (
    <div className="query-element-container">
      <Label className="query-label" customLabel={customLabel} label={label} />
      <Element id={id} value={query.getParam(id)} setValue={getValueChanged(id, query, debounce)} label={label} customLabel={customLabel} {...props} />
    </div>
  ) : (
    <div className="query-element">
      <Element id={id} value={query.getParam(id)} setValue={getValueChanged(id, query, debounce)} label={label} customLabel={customLabel} {...props} />
    </div>
  );
export const QueryElement = ({ id, query, Element, debounce, ...props }: IQueryElementProps) => (
  <Element id={id} value={query.getParam(id)} setValue={getValueChanged(id, query, debounce)} {...props} />
);

const getValueChanged = (id: string, queryBuilder: QueryAPI<any>, debounce?: number) =>
  debounce
    ? (value: any) => {
        TimedCallback.create({
          callback: () => {
            queryBuilder.updateQuery({ id, value });
          },
          id: id,
          timeout: debounce,
        });
      }
    : (value: any) => {
        queryBuilder.updateQuery({ id, value });
      };

const Label = ({ customLabel, label, className }: { customLabel?: string; label: string; className?: string }) => {
  return <p className={className}>{customLabel || label}</p>;
};

const TimedCallback = {
  create: ({ callback, id, timeout }: { callback: () => void; id: string; timeout: number }) => {
    const [state, setState] = React.useState("idle");
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setState("idle");
        callback();
      }, timeout);
      return () => clearTimeout(timer);
    }, [state]);
    return <>{state}</>;
  },
};
