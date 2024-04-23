"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function caching() {
    return function (target) {
        const originalMethods = {};
        function createCachingWrapper(originalMethod, cacheKey) {
            let cachedResult;
            return function (...args) {
                if (cachedResult !== undefined) {
                    console.log(`Cache hit for key: ${cacheKey}`);
                    return cachedResult;
                }
                else {
                    console.log(`Cache miss for key: ${cacheKey}`);
                    cachedResult = originalMethod.apply(this, args);
                    return cachedResult;
                }
            };
        }
        for (let propertyName of Object.getOwnPropertyNames(target.prototype)) {
            if (propertyName !== "constructor" &&
                typeof target.prototype[propertyName] === "function") {
                const originalMethod = target.prototype[propertyName];
                originalMethods[propertyName] = originalMethod;
                const cacheKey = `${target.name}_${propertyName}`;
                target.prototype[propertyName] = createCachingWrapper(originalMethod, cacheKey);
            }
        }
        const destructor = target.prototype["destroy"] || target.prototype["cleanup"];
        target.prototype["destroy"] = target.prototype["cleanup"] = function () {
            for (let propertyName of Object.getOwnPropertyNames(originalMethods)) {
                target.prototype[propertyName] = originalMethods[propertyName];
            }
            if (typeof destructor === "function") {
                destructor.apply(this);
            }
        };
    };
}
let DataService = class DataService {
    getData() {
        console.log("Fetching data...");
        return "Data from server";
    }
};
DataService = __decorate([
    caching()
], DataService);
const service = new DataService();
console.log(service.getData());
console.log(service.getData());
