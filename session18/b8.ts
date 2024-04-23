function caching(): ClassDecorator {
  return function (target: any) {
    const originalMethods: { [key: string]: Function } = {};

    function createCachingWrapper(originalMethod: Function, cacheKey: string) {
      let cachedResult: any;

      return function (this: any, ...args: any[]) {
        if (cachedResult !== undefined) {
          console.log(`Cache hit for key: ${cacheKey}`);
          return cachedResult;
        } else {
          console.log(`Cache miss for key: ${cacheKey}`);
          cachedResult = originalMethod.apply(this, args);
          return cachedResult;
        }
      };
    }

    for (let propertyName of Object.getOwnPropertyNames(target.prototype)) {
      if (
        propertyName !== "constructor" &&
        typeof target.prototype[propertyName] === "function"
      ) {
        const originalMethod = target.prototype[propertyName];
        originalMethods[propertyName] = originalMethod;
        const cacheKey = `${target.name}_${propertyName}`;
        target.prototype[propertyName] = createCachingWrapper(
          originalMethod,
          cacheKey
        );
      }
    }

    const destructor =
      target.prototype["destroy"] || target.prototype["cleanup"];
    target.prototype["destroy"] = target.prototype["cleanup"] = function (
      this: any
    ) {
      for (let propertyName of Object.getOwnPropertyNames(originalMethods)) {
        target.prototype[propertyName] = originalMethods[propertyName];
      }
      if (typeof destructor === "function") {
        destructor.apply(this);
      }
    };
  };
}

@caching()
class DataService {
  getData(): string {
    console.log("Fetching data...");
    return "Data from server";
  }
}

const service = new DataService();
console.log(service.getData());
console.log(service.getData());
