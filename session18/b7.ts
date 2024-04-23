function middleware(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);

    return result;
  };

  return descriptor;
}

class ExampleClass {
  @middleware
  targetFunction(param1: string, param2: number) {
    console.log(`param1: ${param1}, param2: ${param2}`);
  }
}

const example = new ExampleClass();
example.targetFunction("123", 42);
