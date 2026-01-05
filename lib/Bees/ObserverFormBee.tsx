import React from "react";
import { ObserverFormBeeProps } from "./Types";
import { useFormHoney } from "../Hooks";

export default function ObserverFormBee<HiveType = any>({ hive, Component }: ObserverFormBeeProps<HiveType>) {
  const { value, error } = useFormHoney(hive);
  return <Component honey={value} error={error} />;
}
