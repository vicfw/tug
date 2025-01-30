type LocalStorageKeys = "token";

export const localStorageSetter = (key: LocalStorageKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const localStorageGetter = (key: LocalStorageKeys) => {
  return localStorage.getItem(key);
};
