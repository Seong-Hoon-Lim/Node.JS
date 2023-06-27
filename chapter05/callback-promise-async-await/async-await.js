/**
 * async 와 await 구문을 활용한 예제 코드
 *
 * 함수 앞에 붙는 키워드로 async 가 붙으면 비동기 함수로 인식
 * 여기서 비동기는 콜백이 아닌 Promise 를 지칭함
 * async 가 붙은 함수는 Promise 를 반환함.
 * @returns {Promise<void>}
 *
 * await 은 성공 또는 실패로 Promise 객체의 실행이 완료되기를 기다림
 * await 뒤에는 Promise 가 오게 되며, async 키워드를 사용한 함수 안에서만 사용가능
 */

async function myName() {
    return "node";
}

//이름을 출력하는 함수
async function showName() {
    const name = await myName();
    console.log(name);
}

console.log(showName());