const dataType = (data: any): string | undefined =>
  Object.prototype.toString.call(data).match(/(?<=\[object\s)\w*(?=\])/)?.[0];

export function isFunction(data: any) {
  return dataType(data) === 'Function';
}
export function isArray(data: any) {
  return dataType(data) === 'Array';
}
export function isObject(data: any) {
  return dataType(data) === 'Object';
}
export function isNull(data: any) {
  return dataType(data) === 'Null';
}
export function isUndefined(data: any) {
  return dataType(data) === 'Undefined';
}
export function isJSON(data: any) {
  return window.JSON && dataType(data) === 'JSON';
}
export function isNumber(data: any) {
  return dataType(data) === 'Number';
}
export function isBoolean(data: any) {
  return dataType(data) === 'Boolean';
}

export function isRegExp(data: any) {
  return dataType(data) == 'RegExp';
}

