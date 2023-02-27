import { Global } from '../util';

function sessionStorage() {
  return Global.sessionStorage;
}

function read(key: string) {
  return sessionStorage().getItem(key);
}

function write(key: string, data: any) {
  return sessionStorage().setItem(key, data);
}

function each(fn: any) {
  for (var i = sessionStorage().length - 1; i >= 0; i--) {
    var key = sessionStorage().key(i);
    if (key) fn(read(key), key);
  }
}

function remove(key: string) {
  return sessionStorage().removeItem(key);
}

function clearAll() {
  return sessionStorage().clear();
}

export default {
  name: 'sessionStorage',
  read: read,
  write: write,
  each: each,
  remove: remove,
  clearAll: clearAll,
};
