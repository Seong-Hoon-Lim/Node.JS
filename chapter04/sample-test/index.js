/**
 * sample-package import 테스트 코드
 */

const calc = require("sample-package");   //sample-package 불러오기

const a = 17;
const b = 3;

console.log("a + b = ", calc.add(a, b));    //더하기
console.log("a - b = ", calc.sub(a, b));    //뺴기
console.log("a * b = ", calc.mul(a, b));    //곱하기
console.log("a / b = ", calc.div(a, b));    //나누기