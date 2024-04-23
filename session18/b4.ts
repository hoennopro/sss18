function parameterValidation(
  validationFunction: (...args: any[]) => boolean
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (validationFunction(...args)) {
        return originalMethod.apply(this, args);
      } else {
        throw new Error("Parameter validation failed");
      }
    };
  };
}

function validateNumbers(...args: any[]): boolean {
  return args.every((arg) => typeof arg === "number");
}

class Calculator4 {
  @parameterValidation(validateNumbers)
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc4 = new Calculator();

console.log(calc.add(3, 5));

// console.log(calc.add("a", 5));
