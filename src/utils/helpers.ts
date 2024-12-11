/**
 * Safely extract a value from an object, returning a default value if undefined.
 * @param obj - The object to extract the value from.
 * @param key - The key to access.
 * @param defaultValue - A default value if the key does not exist.
 */
export function getValue<T, K extends keyof T>(obj: T, key: K, defaultValue: any = null): any {
    return obj[key] ?? defaultValue;
  }
  
  /**
   * Converts a string to title case.
   * @param str - The string to convert.
   */
  export function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }
  
  /**
   * Delays execution for a specified amount of time.
   * @param ms - Time in milliseconds to wait.
   */
  export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  