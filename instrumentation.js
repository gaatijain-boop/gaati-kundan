// Next.js instrumentation — runs before the app starts server-side
// This patches the broken localStorage global injected by some VS Code extensions
export function register() {
  if (
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem !== 'function'
  ) {
    // Replace broken localStorage shim with a safe no-op implementation
    global.localStorage = {
      _data: {},
      getItem(key) { return this._data[key] ?? null; },
      setItem(key, value) { this._data[key] = String(value); },
      removeItem(key) { delete this._data[key]; },
      clear() { this._data = {}; },
      key(i) { return Object.keys(this._data)[i] ?? null; },
      get length() { return Object.keys(this._data).length; },
    };
  }
}
