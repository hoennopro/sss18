function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Function name: ${propertyKey}`);

    console.log("Input arguments:", args);

    const result = originalMethod.apply(this, args);

    console.log("Result:", result);

    return result;
  };

  return descriptor;
}

class Calculator {
  @logger
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(3, 5);
