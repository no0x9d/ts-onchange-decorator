export function OnChange(changeHandler?: Function | string, backingField?: string): any {

  return function onChangeDecorator(target: Object, key: string,
    descriptor: PropertyDescriptor): PropertyDescriptor | undefined {

    if (descriptor) {
      return handlePropertyDescriptor(changeHandler, key, descriptor);
    } else {
      handleAccessorDecorator(changeHandler, target, key, backingField);
    }
    return undefined;
  }
}

// handle property decorator
function handlePropertyDescriptor(changeHandler: Function | string | undefined, key: string,
  descriptor: PropertyDescriptor) {

  let onChangeHandler: Function | undefined | null = undefined;
  const originalSetter = descriptor.set;

  descriptor.set = function(value: any) {
    const oldValue = descriptor.get ? descriptor.get.call(this) : null;
    originalSetter && originalSetter.call(this, value);

    if (onChangeHandler === undefined) {
      onChangeHandler = resolveChangeHandler(this, changeHandler, key);
    }
    onChangeHandler && onChangeHandler.call(this, value, oldValue);
  };
  return descriptor;
}

function handleAccessorDecorator(changeHandler: Function | string | undefined,
  target: any,
  key: string,
  backingField: string | undefined) {

  let onChangeHandler: Function | undefined | null = undefined;

  const k = backingField || '_' + key;
  // property getter
  const getter = function() {
    return this[k];
  };

  // property setter
  const setter = function(value: any) {
    const oldValue = this[k];
    this[k] = value;
    if (onChangeHandler === undefined) {
      onChangeHandler = resolveChangeHandler(this, changeHandler, key);
    }
    onChangeHandler && onChangeHandler.call(this, value, oldValue);
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

function resolveChangeHandler(context: any,
  changeHandler: Function | string | undefined,
  key: string): Function | null {

  if (typeof changeHandler === 'function') {
    return changeHandler;
  }
  const methodKey = typeof changeHandler === 'string' ? changeHandler : key + 'Change';
  const onChangeCandidate = context[methodKey];
  if (typeof onChangeCandidate === 'function') {
    return onChangeCandidate;
  }
  return null;
}
