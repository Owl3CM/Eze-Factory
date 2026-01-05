import React from "react";
import { IHive } from "../../Hives";
import { useHoney } from "../../Hooks";

interface IStateBuilderProps {
  factory?: {
    status?: {
      getStatusComponent: () => any;
      hive: IHive<any>;
    };
    canLoadHive?: IHive<boolean>;
    // Support loose shape from Wrapper
    statusHive?: IHive<any>;
    statusKit?: any;
  };
  // Support direct props from Wrapper
  hive?: IHive<any>;
}

function StatusBee({ factory, hive }: IStateBuilderProps) {
  const activeHive = hive || factory?.status?.hive || factory?.statusHive;

  useHoney(activeHive as any);

  if (factory?.status?.getStatusComponent) {
    return factory.status.getStatusComponent();
  }

  // Fallback logic
  if (activeHive) {
    const status = activeHive.honey;
    const kit = factory?.statusKit;
    if (kit) {
      const Component = kit[status] || kit.default || kit.error || null;
      // If Component is a function component, render it; otherwise return as node
      if (typeof Component === "function") {
        return <Component />;
      }
      return Component;
    }
  }
  return null;
}
export default StatusBee;
