var num1 = 1;
var num2 = num1;
console.log(num1, num2); // 1 1
num1 = 2;
console.log(num1, num2); // 2 1

num1 = { value: 1 };
num2 = num1;
console.log(num1.value, num2.value); // 1 1
num1.value = 2;
console.log(num1.value, num2.value); // 2 2
