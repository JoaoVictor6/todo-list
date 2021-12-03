import {useEffect, useState} from 'react';

function getItem<T>(key: string): T | null {
  const response = localStorage.getItem(key);
  if (response === null) return response;
  return JSON.parse(response as string);
}

function setItem(key: string, value: any): void {
  const storage = localStorage;
  const valueStringify = JSON.stringify(value);
  storage.setItem(key, valueStringify);
}

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(() => {
    const saved = getItem<T>(key);

    return saved || defaultValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
