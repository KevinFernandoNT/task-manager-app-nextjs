/**
 * Result type for server actions
 * Provides a consistent way to handle success and error states
 */
export type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Creates a success result
 */
export function success<T>(data: T): ActionResult<T> {
  return {
    success: true,
    data,
    error: undefined,
  };
}

/**
 * Creates an error result
 */
export function failure(error: string): ActionResult<never> {
  return {
    success: false,
    data: undefined,
    error,
  };
}

