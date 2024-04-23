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
function timingDecorator(target, propertyKey, descriptor) {
    const originalMethod = target[propertyKey];
    descriptor.value = function (...args) {
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
    add(a, b) {
        return a + b;
    }
}
__decorate([
    timingDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator2.prototype, "add", null);
const calc2 = new Calculator();
calc.add(3, 5);
