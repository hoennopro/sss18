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
function cachingDecorator(target, propertyKey, descriptor) {
    const originalMethod = target[propertyKey];
    const cache = {};
    descriptor.value = function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log(`Retrieving result from cache for arguments: ${key}`);
            return cache[key];
        }
        else {
            const result = originalMethod.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}
class Calculator3 {
    add(a, b) {
        console.log("Adding", a, "and", b);
        return a + b;
    }
}
__decorate([
    cachingDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator3.prototype, "add", null);
const calc3 = new Calculator();
console.log(calc.add(3, 5));
console.log(calc.add(3, 5));
