export default function updatePlugin() {
  return {
    update: update,
  };

  function update(_: any, key: string, optDefaultVal: any, updateFn: any) {
    if (arguments.length == 3) {
      updateFn = optDefaultVal;
      optDefaultVal = undefined;
    }
    var val = this.get(key, optDefaultVal);
    var retVal = updateFn(val);
    this.set(key, retVal != undefined ? retVal : val);
  }
}
