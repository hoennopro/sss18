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
const parameterTypesMap = new Map();
function ParameterTypes(...types) {
    return function (target, propertyKey, descriptor) {
        parameterTypesMap.set(propertyKey, types);
    };
}
function parameterTypeValidation(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const parameterTypes = parameterTypesMap.get(propertyKey) || [];
        if (args.length !== parameterTypes.length) {
            return new Error("Number of parameters doesn't match");
        }
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] !== parameterTypes[i].name.toLowerCase()) {
                return new Error(`Parameter ${i + 1} should be of type ${parameterTypes[i].name}`);
            }
        }
        return originalMethod.apply(this, args);
    };
}
class Calculator6 {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    ParameterTypes(Number, Number),
    parameterTypeValidation,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator6.prototype, "add", null);
const calc6 = new Calculator();
console.log(calc.add(3, 5));
// const resultWithError = calc.add("a", 5);
// if (resultWithError instanceof Error) {
// console.error(resultWithError.message);
// }
