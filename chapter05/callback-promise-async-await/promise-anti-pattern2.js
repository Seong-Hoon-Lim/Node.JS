/**
 * Promise 가 잘못 사용될 여지가 있는 예제 코드
 * Promise 가 중첩으로 사용 되는 경우
 */

function myWork(work) {
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase());
    })
}

function playGame(work) {
    return new Promise((resolve, reject) => {
        if (work === 'DONE') {
            resolve('GO PLAY GAME');
        }
        else {
            reject(new Error("DON'T"));
        }
    })
}

//Promise 를 중첩해서 사용
myWork('done')
    .then(function (result) {
        playGame(result)
            .then(function (val) {
                console.log(val);
            });
    })

//결과를 then 으로 넘김
myWork('done')
    .then(playGame)
    .then(console.log);