/**
 * async, await 와 setTimeout() 를 사용하여
 * 1부터 10까지 1초에 하나씩 출력하는 코드
 */

//1초 대기하고 메시지를 출력
function waitOneSecond(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(`${msg}`), 1000);
    });
}

//10초 동안 1초 마다 메시지를 출력
async function countOneToTen() {
    //0부터 9까지 반복 순회
    for (let x of [...Array(10).keys()]) {
        //1초 대기 후 result 에 결과값 저장
        let result = await waitOneSecond(`${x + 1}초 대기 중...`);
        console.log(result);
    }
    console.log("완료");
}

countOneToTen();