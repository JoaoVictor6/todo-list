
function getItem<T>(key: string): T[] | null {
  const storage = localStorage;
  const response = storage.getItem(key);
  if (typeof response === null) return null;
  return JSON.parse(response as string);
}

function setItem<T>(key: string, value: T[]): void {
  const storage = localStorage;
  const valueStringify = JSON.stringify(value);
  storage.setItem(key, valueStringify);
}

export {getItem, setItem};
