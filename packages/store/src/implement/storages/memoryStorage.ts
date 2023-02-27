// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

let memoryStorage: Record<string, any> = {};

function read(key: string) {
  return memoryStorage[key];
}

function write(key: string, data: any) {
  memoryStorage[key] = data;
}

function each(callback: any) {
  for (var key in memoryStorage) {
    if (memoryStorage.hasOwnProperty(key)) {
      callback(memoryStorage[key], key);
    }
  }
}

function remove(key: string) {
  delete memoryStorage[key];
}

function clearAll(key: string) {
  memoryStorage = {};
}

export default {
  name: 'memoryStorage',
  read: read,
  write: write,
  each: each,
  remove: remove,
  clearAll: clearAll,
};
