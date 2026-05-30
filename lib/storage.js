// Safe localStorage wrapper — prevents SSR crashes

function isBrowser() {
  return (
    typeof window !== 'undefined' &&
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem === 'function'
  );
}

export const safeStorage = {
  getItem(key) {
    if (!isBrowser()) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key, value) {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage full or unavailable
    }
  },
  removeItem(key) {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
