function cachingDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = target[propertyKey];
  const cache: { [key: string]: any } = {};

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log(`Retrieving result from cache for arguments: ${key}`);
      return cache[key];
    } else {
      const result = originalMethod.apply(this, args);

      cache[key] = result;
      return result;
    }
  };
}

class Calculator3 {
  @cachingDecorator
  add(a: number, b: number): number {
    console.log("Adding", a, "and", b);
    return a + b;
  }
}

const calc3 = new Calculator();
console.log(calc.add(3, 5));
console.log(calc.add(3, 5));
