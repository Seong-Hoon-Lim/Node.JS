/**
 * Promise 가 잘못 사용될 여지가 있는 예제 코드
 */

function myWork(work) {
    return new Promise((resolve, reject) => {
        if (work === 'done') {
            resolve('게임 가능');
        }
        else {
            reject(new Error("게임 불가능"));
        }
    })
}

//콜백 함수와 다를 바가 없는 코드
myWork('done')
    .then(function (value) {
        console.log(value)
    }, function (err) {
    console.error(err)
    });

//catch() 함수를 활용한 적절한 코드
myWork('doing')
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.error(err);
    });