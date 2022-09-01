export const setLocalStorage = (
  key: string,
  value: Record<string, unknown>
): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): unknown => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key) || "{}");
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

export const clearLocalStorage = (): void => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};
  