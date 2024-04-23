function logger1(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Function name: ${String(propertyKey)}`);
    console.log("Input arguments:", args);
    const result = originalMethod.apply(this, args);
    console.log("Result:", result);
    return result;
  };
}

function timing(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = Date.now();
    const result = originalMethod.apply(this, args);
    const executionTime = Date.now() - startTime;
    console.log(
      `Execution time for ${String(propertyKey)}: ${executionTime} milliseconds`
    );
    return result;
  };
}

function composeDecorators(...decorators: MethodDecorator[]): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    for (let decorator of decorators.reverse()) {
      descriptor = decorator(target, propertyKey, descriptor) || descriptor;
    }
    return descriptor;
  };
}

class Calculator5 {
  @composeDecorators(logger1, timing)
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc5 = new Calculator();
calc.add(3, 5);
