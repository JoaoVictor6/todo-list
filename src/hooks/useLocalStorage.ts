
function getItem<T, K = unknown>(key: string): K | null {
  const storage = localStorage;
  const response = storage.getItem(key);
  if (response === null) return null;
  return JSON.parse(response as string);
}

function setItem(key: string, value: any): void {
  const storage = localStorage;
  const valueStringify = JSON.stringify(value);
  storage.setItem(key, valueStringify);
}

export {getItem, setItem};
