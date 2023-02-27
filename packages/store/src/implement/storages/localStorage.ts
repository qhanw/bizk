import { Global } from '../util';

function localStorage() {
  return Global.localStorage;
}

function read(key: string) {
  return localStorage().getItem(key);
}

function write(key: string, data: any) {
  return localStorage().setItem(key, data);
}

function each(fn: any) {
  for (var i = localStorage().length - 1; i >= 0; i--) {
    const key = localStorage().key(i);
    if (key) fn(read(key), key);
  }
}

function remove(key: any) {
  return localStorage().removeItem(key);
}

function clearAll() {
  return localStorage().clear();
}

export default {
  name: 'localStorage',
  read: read,
  write: write,
  each: each,
  remove: remove,
  clearAll: clearAll,
};
