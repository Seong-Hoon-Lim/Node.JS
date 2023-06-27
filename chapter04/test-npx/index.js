/**
 * prettier 적용을 위한 포매팅 전 후 비교 코드
 * @param min
 * @param max
 */

function getRandomInt(min, max) {
  /* 주석도 포매팅해줌 */
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log(getRandomInt(10, 20));
