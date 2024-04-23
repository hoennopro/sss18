"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function logger1(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Function name: ${String(propertyKey)}`);
        console.log("Input arguments:", args);
        const result = originalMethod.apply(this, args);
        console.log("Result:", result);
        return result;
    };
}
function timing(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const startTime = Date.now();
        const result = originalMethod.apply(this, args);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time for ${String(propertyKey)}: ${executionTime} milliseconds`);
        return result;
    };
}
function composeDecorators(...decorators) {
    return function (target, propertyKey, descriptor) {
        for (let decorator of decorators.reverse()) {
            descriptor = decorator(target, propertyKey, descriptor) || descriptor;
        }
        return descriptor;
    };
}
class Calculator5 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    composeDecorators(logger1, timing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator5.prototype, "add", null);
const calc5 = new Calculator();
calc.add(3, 5);
