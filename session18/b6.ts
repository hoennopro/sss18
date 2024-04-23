const parameterTypesMap = new Map<string | symbol, Function[]>();

function ParameterTypes(...types: Function[]): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    parameterTypesMap.set(propertyKey, types);
  };
}

function parameterTypeValidation(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const parameterTypes: Function[] = parameterTypesMap.get(propertyKey) || [];

    if (args.length !== parameterTypes.length) {
      return new Error("Number of parameters doesn't match");
    }

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] !== parameterTypes[i].name.toLowerCase()) {
        return new Error(
          `Parameter ${i + 1} should be of type ${parameterTypes[i].name}`
        );
      }
    }

    return originalMethod.apply(this, args);
  };
}

class Calculator6 {
  @ParameterTypes(Number, Number)
  @parameterTypeValidation
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc6 = new Calculator();
console.log(calc.add(3, 5));

// const resultWithError = calc.add("a", 5);
// if (resultWithError instanceof Error) {
// console.error(resultWithError.message);
// }
