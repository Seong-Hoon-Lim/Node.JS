/**
 * sample-package 를 불러오면 실행할 코드
 * 모듈을 require 함수로 포함시킬 때 실행됨.
 */

console.log("require 로 부르면 실행됨.");

//require 를 사용해 불러왔을 때 반환하는 객체를 저장할 변수
module.exports = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b
}