// Decorator function for throttling
function throttleDecorator(interval: number): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    let timeout: NodeJS.Timeout | null = null;
    let lastExecuted = 0;

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      const remainingTime = interval - (now - lastExecuted);

      const execute = () => {
        lastExecuted = Date.now();
        originalMethod.apply(this, args);
      };

      if (remainingTime <= 0) {
        // If remaining time is non-positive, execute immediately
        execute();
      } else {
        // Otherwise, schedule execution after remaining time
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(execute, remainingTime);
      }
    };
  };
}

// Example class with throttle decorator applied
class Example {
  @throttleDecorator(1000) // Throttle to 1 second interval
  log(message: string): void {
    console.log(message);
  }
}

// Example usage
const example1 = new Example();
example1.log("First message"); // This will be logged immediately
setTimeout(() => {
  example1.log("Second message"); // This will be logged after 1 second
}, 500);
setTimeout(() => {
  example1.log("Third message"); // This will be logged after 1 second from the second message
}, 1500);
