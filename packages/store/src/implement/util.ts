function make_assign() {
  if (Object.assign) {
    return Object.assign;
  } else {
    return function shimAssign(obj, props1, props2, etc) {
      for (var i = 1; i < arguments.length; i++) {
        each(Object(arguments[i]), function (val, key) {
          obj[key] = val;
        });
      }
      return obj;
    };
  }
}

function make_create() {
  if (Object.create) {
    return function create(obj, assignProps1, assignProps2, etc) {
      var assignArgsList = slice(arguments, 1);
      return assign.apply(this, [Object.create(obj)].concat(assignArgsList));
    };
  } else {
    function F() {} // eslint-disable-line no-inner-declarations
    return function create(obj, assignProps1, assignProps2, etc) {
      var assignArgsList = slice(arguments, 1);
      F.prototype = obj;
      return assign.apply(this, [new F()].concat(assignArgsList));
    };
  }
}

function make_trim() {
  if (String.prototype.trim) {
    return function trim(str: string) {
      return String.prototype.trim.call(str);
    };
  } else {
    return function trim(str: string) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
}

function bind(obj, fn) {
  return function () {
    return fn.apply(obj, Array.prototype.slice.call(arguments, 0));
  };
}

function slice(arr: [], index: number) {
  return Array.prototype.slice.call(arr, index || 0);
}

function each(obj, fn) {
  pluck(obj, function (val, key) {
    fn(val, key);
    return false;
  });
}

function map(obj, fn) {
  var res = isList(obj) ? [] : {};
  pluck(obj, function (v, k) {
    res[k] = fn(v, k);
    return false;
  });
  return res;
}

function pluck(obj, fn) {
  if (isList(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (fn(obj[i], i)) {
        return obj[i];
      }
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (fn(obj[key], key)) {
          return obj[key];
        }
      }
    }
  }
}

function isList(val: any) {
  return (
    val != null && typeof val != 'function' && typeof val.length == 'number'
  );
}

function isFunction(val: any) {
  return val && {}.toString.call(val) === '[object Function]';
}

function isObject(val: any) {
  return val && {}.toString.call(val) === '[object Object]';
}

var Global = typeof window !== 'undefined' ? window : globalThis;

const assign = make_assign;
const create = make_create;
const trim = make_trim;

export {
  assign,
  create,
  trim,
  bind,
  slice,
  each,
  map,
  pluck,
  isList,
  isFunction,
  isObject,
  Global,
};
