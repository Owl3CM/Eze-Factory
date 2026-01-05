import React from "react";
import { useHoney } from "../../../../Hooks";
import { StatusAPI, StatusKit } from "../Types";

interface StatusComponentProps<K extends StatusKit> {
  status: StatusAPI<K>;
}

/**
 * StatusComponent - Renders the primary status using getComponent
 *
 * @deprecated Use StatusIndicator instead for more control
 */
function StatusComponent<K extends StatusKit>({ status }: StatusComponentProps<K>) {
  useHoney(status.hive);

  const primary = status.getPrimary();
  if (!primary) return null;

  const Component = status.getComponent(primary.statusType);
  return <Component {...primary.props} />;
}

export default StatusComponent;
