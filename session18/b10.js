"use strict";
function add(a, b) {
    // Kiểm tra nếu a hoặc b là chuỗi và không phải là số hợp lệ
    if (typeof a === "string" && isNaN(Number(a))) {
        return "Giá trị không hợp lệ";
    }
    if (typeof b === "string" && isNaN(Number(b))) {
        return "Giá trị không hợp lệ";
    }
    // Thực hiện phép cộng
    return Number(a) + Number(b);
}
function subtract(a, b) {
    // Kiểm tra nếu a hoặc b là chuỗi và không phải là số hợp lệ
    if (typeof a === "string" && isNaN(Number(a))) {
        return "Giá trị không hợp lệ";
    }
    if (typeof b === "string" && isNaN(Number(b))) {
        return "Giá trị không hợp lệ";
    }
    // Thực hiện phép trừ
    return Number(a) - Number(b);
}
function multiply(a, b) {
    // Kiểm tra nếu a hoặc b là chuỗi và không phải là số hợp lệ
    if (typeof a === "string" && isNaN(Number(a))) {
        return "Giá trị không hợp lệ";
    }
    if (typeof b === "string" && isNaN(Number(b))) {
        return "Giá trị không hợp lệ";
    }
    // Thực hiện phép nhân
    return Number(a) * Number(b);
}
function divide(a, b) {
    // Kiểm tra nếu a hoặc b là chuỗi và không phải là số hợp lệ
    if (typeof a === "string" && isNaN(Number(a))) {
        return "Giá trị không hợp lệ";
    }
    if (typeof b === "string" && isNaN(Number(b))) {
        return "Giá trị không hợp lệ";
    }
    // Kiểm tra phép chia cho 0
    if (Number(b) === 0) {
        return "Không thể chia cho 0";
    }
    // Thực hiện phép chia
    return Number(a) / Number(b);
}
// Example usage
console.log(add(10, 5)); // 15
console.log(add("10", 5)); // 15
console.log(add("abc", 5)); // Giá trị không hợp lệ
console.log(subtract(10, 5)); // 5
console.log(subtract("10", 5)); // 5
console.log(subtract("abc", 5)); // Giá trị không hợp lệ
console.log(multiply(10, 5)); // 50
console.log(multiply("10", 5)); // 50
console.log(multiply("abc", 5)); // Giá trị không hợp lệ
console.log(divide(10, 5)); // 2
console.log(divide(10, 0)); // Không thể chia cho 0
console.log(divide("10", 5)); // 2
console.log(divide("abc", 5)); // Giá trị không hợp lệ
