export const isObjectEmpty = (
  obj: Record<never, unknown> | undefined
): boolean => {
  if (obj) {
    return Object.keys(obj).length === 0;
  }

  return false;
};