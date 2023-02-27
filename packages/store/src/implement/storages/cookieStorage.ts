// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

import { Global, trim } from '../util';

var doc = Global.document;

function read(key: string) {
  if (!key || !_has(key)) {
    return null;
  }
  var regexpStr =
    '(?:^|.*;\\s*)' +
    escape(key).replace(/[\-\.\+\*]/g, '\\$&') +
    '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*';
  return unescape(doc.cookie.replace(new RegExp(regexpStr), '$1'));
}

function each(callback) {
  var cookies = doc.cookie.split(/; ?/g);
  for (var i = cookies.length - 1; i >= 0; i--) {
    if (!trim(cookies[i])) {
      continue;
    }
    var kvp = cookies[i].split('=');
    var key = unescape(kvp[0]);
    var val = unescape(kvp[1]);
    callback(val, key);
  }
}

function write(key: string, data: any) {
  if (!key) {
    return;
  }
  doc.cookie =
    escape(key) +
    '=' +
    escape(data) +
    '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
}

function remove(key: string) {
  if (!key || !_has(key)) {
    return;
  }
  doc.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function clearAll() {
  each(function (_: any, key: string) {
    remove(key);
  });
}

function _has(key: string) {
  return new RegExp(
    '(?:^|;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=',
  ).test(doc.cookie);
}

export default {
  name: 'cookieStorage',
  read: read,
  write: write,
  each: each,
  remove: remove,
  clearAll: clearAll,
};
