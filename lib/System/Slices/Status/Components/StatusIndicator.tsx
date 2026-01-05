import React, { ReactNode } from "react";
import { useHoney } from "../../../../Hooks";
import { StatusAPI, StatusKit, StatusTypeNames, OperationState } from "../Types";

// ============================================================================
// StatusIndicator - Generic scoped indicator
// ============================================================================

interface StatusIndicatorProps<K extends StatusKit> {
  /** The status API from the factory */
  status: StatusAPI<K>;
  /** Optional: Only listen to these operations */
  operations?: string[];
  /** Optional: Only show these status types */
  statusTypes?: StatusTypeNames<K>[];
  /** Optional: Custom render function */
  children?: (state: OperationState<K> | null) => ReactNode;
}

/**
 * StatusIndicator - Displays status based on active operations
 *
 * @example
 * // Show status for all operations
 * <StatusIndicator status={status} />
 *
 * // Scoped to specific operations
 * <StatusIndicator
 *   status={status}
 *   operations={['table', 'table-sort']}
 * />
 *
 * // Custom render
 * <StatusIndicator status={status}>
 *   {(state) => state ? <CustomLoader /> : null}
 * </StatusIndicator>
 */
export function StatusIndicator<K extends StatusKit>({ status, operations, statusTypes, children }: StatusIndicatorProps<K>): ReactNode {
  // Subscribe to hive changes
  useHoney(status.hive);

  // Get the primary operation state based on filters
  const primaryState = status.getPrimary(operations, statusTypes);

  // Custom render if provided
  if (children) {
    return children(primaryState);
  }

  // No active operation
  if (!primaryState) {
    return null;
  }

  // Get component from kit and render
  const Component = status.getComponent(primaryState.statusType);
  return <Component {...primaryState.props} />;
}

// ============================================================================
// Type-specific convenience components
// ============================================================================

interface TypedIndicatorProps<K extends StatusKit> {
  status: StatusAPI<K>;
  operations?: string[];
}

/**
 * LoadingIndicator - Only shows loading status
 */
export function LoadingIndicator<K extends StatusKit>({ status, operations }: TypedIndicatorProps<K>): ReactNode {
  return <StatusIndicator status={status} operations={operations} statusTypes={["loading"] as StatusTypeNames<K>[]} />;
}

/**
 * ErrorDisplay - Only shows error status
 */
export function ErrorDisplay<K extends StatusKit>({ status, operations }: TypedIndicatorProps<K>): ReactNode {
  return <StatusIndicator status={status} operations={operations} statusTypes={["error"] as StatusTypeNames<K>[]} />;
}

/**
 * SuccessToast - Only shows success status
 */
export function SuccessToast<K extends StatusKit>({ status, operations }: TypedIndicatorProps<K>): ReactNode {
  return <StatusIndicator status={status} operations={operations} statusTypes={["success"] as StatusTypeNames<K>[]} />;
}

// ============================================================================
// StatusGuard - Conditional rendering
// ============================================================================

interface StatusGuardProps<K extends StatusKit> {
  status: StatusAPI<K>;
  operations?: string[];
  statusTypes?: StatusTypeNames<K>[];
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * StatusGuard - Show fallback while status is active, otherwise show children
 *
 * @example
 * <StatusGuard
 *   status={status}
 *   operations={['table']}
 *   fallback={<Skeleton />}
 * >
 *   <TableContent />
 * </StatusGuard>
 */
export function StatusGuard<K extends StatusKit>({ status, operations, statusTypes, fallback, children }: StatusGuardProps<K>): ReactNode {
  useHoney(status.hive);

  const primaryState = status.getPrimary(operations, statusTypes);

  // Show fallback if any matching status is active
  if (primaryState) {
    // Check if it's a "blocking" status (loading, saving, etc.)
    const blockingTypes = ["loading", "saving"];
    if (blockingTypes.includes(primaryState.statusType as string)) {
      return fallback;
    }
  }

  return children;
}

// ============================================================================
// ProgressBar - For status types with progress
// ============================================================================

interface ProgressBarProps<K extends StatusKit> {
  status: StatusAPI<K>;
  operations: string[];
  className?: string;
}

/**
 * ProgressBar - Shows progress from status props
 *
 * @example
 * <ProgressBar
 *   status={status}
 *   operations={['upload']}
 * />
 */
export function ProgressBar<K extends StatusKit>({ status, operations, className }: ProgressBarProps<K>): ReactNode {
  useHoney(status.hive);

  const state = status.getPrimary(operations);

  if (!state || !("progress" in state.props)) {
    return null;
  }

  const progress = state.props.progress as number;

  return (
    <div className={className || "status-progress-bar"}>
      <div className="status-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ============================================================================
// Re-export for convenience
// ============================================================================

export const StatusComponents = {
  StatusIndicator,
  LoadingIndicator,
  ErrorDisplay,
  SuccessToast,
  StatusGuard,
  ProgressBar,
};
