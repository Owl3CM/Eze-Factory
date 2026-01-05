import React from "react";
import { StatusKit, StatusTypeConfig } from "./Slices/Status/Types";

// ============================================================================
// Default StatusKit
// ============================================================================

/**
 * Default StatusKit with standard status types.
 * Extend or override this in your factory configuration.
 *
 * @example
 * // Use default kit
 * StatusSlice({ statusKit: DefaultStatusKit })
 *
 * // Extend with custom types
 * StatusSlice({
 *   statusKit: {
 *     ...DefaultStatusKit,
 *     uploadProgress: {
 *       priority: 3,
 *       props: {} as { fileName: string; progress: number },
 *       component: ({ fileName, progress }) => <UploadBar fileName={fileName} progress={progress} />,
 *     },
 *   }
 * })
 */
export const DefaultStatusKit = {
  idle: {
    priority: 999,
    props: {},
    component: () => null,
  },

  loading: {
    priority: 1,
    props: {} as { message?: string; variant?: "full" | "skeleton" | "spinner" },
    component: ({ message, variant }) => {
      // Default loading component - override in your kit
      return (
        <div className="status-loading" data-variant={variant}>
          {message || "Loading..."}
        </div>
      );
    },
  },

  saving: {
    priority: 2,
    props: {} as { message: string; disableUI?: boolean },
    component: ({ message, disableUI }) => (
      <div className="status-saving" data-disabled={disableUI}>
        {message}
      </div>
    ),
  },

  success: {
    priority: 998,
    props: {} as { message: string },
    component: ({ message }) => <div className="status-success">{message}</div>,
  },

  error: {
    priority: 0, // Highest priority - errors always show
    props: {} as { message: string; retry?: () => void },
    component: ({ message, retry }) => (
      <div className="status-error">
        <span>{message}</span>
        {retry && <button onClick={retry}>Retry</button>}
      </div>
    ),
  },
} satisfies StatusKit;

// ============================================================================
// Type Helpers
// ============================================================================

/**
 * Extract status type names from DefaultStatusKit
 */
export type DefaultStatusType = keyof typeof DefaultStatusKit;

/**
 * Extract props for a specific default status type
 */
export type DefaultStatusProps<T extends DefaultStatusType> = (typeof DefaultStatusKit)[T]["props"];

/**
 * Helper to create a StatusKit with type inference
 */
export function createStatusKit<K extends StatusKit>(kit: K): K {
  return kit;
}

/**
 * Helper to extend the default kit with custom status types
 */
export function extendStatusKit<K extends StatusKit>(customKit: K): typeof DefaultStatusKit & K {
  return { ...DefaultStatusKit, ...customKit };
}
