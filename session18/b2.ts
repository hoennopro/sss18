function timingDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = target[propertyKey];

  descriptor.value = function (...args: any[]) {
    console.log(`Function name: ${propertyKey}`);

    console.log("Input arguments:", args);

    const startTime = Date.now();

    const result = originalMethod.apply(this, args);

    const executionTime = Date.now() - startTime;

    console.log(`Execution time: ${executionTime} milliseconds`);

    console.log("Result:", result);

    return result;
  };
}

class Calculator2 {
  @timingDecorator
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc2 = new Calculator();
calc.add(3, 5);
