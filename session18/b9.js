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
// Decorator function for throttling
function throttleDecorator(interval) {
    return function (target, propertyKey, descriptor) {
        let timeout = null;
        let lastExecuted = 0;
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const now = Date.now();
            const remainingTime = interval - (now - lastExecuted);
            const execute = () => {
                lastExecuted = Date.now();
                originalMethod.apply(this, args);
            };
            if (remainingTime <= 0) {
                // If remaining time is non-positive, execute immediately
                execute();
            }
            else {
                // Otherwise, schedule execution after remaining time
                if (timeout)
                    clearTimeout(timeout);
                timeout = setTimeout(execute, remainingTime);
            }
        };
    };
}
// Example class with throttle decorator applied
class Example {
    log(message) {
        console.log(message);
    }
}
__decorate([
    throttleDecorator(1000) // Throttle to 1 second interval
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Example.prototype, "log", null);
// Example usage
const example1 = new Example();
example1.log("First message"); // This will be logged immediately
setTimeout(() => {
    example1.log("Second message"); // This will be logged after 1 second
}, 500);
setTimeout(() => {
    example1.log("Third message"); // This will be logged after 1 second from the second message
}, 1500);
