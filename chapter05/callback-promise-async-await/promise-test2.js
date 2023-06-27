/**
 * 콜백함수 테스트 코드 (회원가입 3단계 가정) 를
 * Promise 객체를 사용하는 방식으로 변경, catch/finally 사용 코드
 * 회원가입 API 호출
 * -> DB 저장 -> 이메일발송 -> 성공메시지 출력
 * @type {*[]}
 */

const DB = [];

//회원가입 API 함수(콜백이 3중으로 중첩된 함수)
function saveDB(user) {
    const oldDBSize = DB.length + 1;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    //콜백함수가 아닌 Promise 객체 반환
    return new Promise((resolve, reject) => {
       if (DB.length > oldDBSize) {
           resolve(user);   //성공 시 유저 정보 반환
       }
       else {
           reject(new Error("Save DB Error!"));   //실패 시 에러 발생
       }
    });
}

//이메일 발송 로그만 남기는 코드 실행 후 콜백 실행
function sendEmail(user) {
    console.log(`email to ${user.email}`);
    //Promise 객체를 반환. 실패 처리 없음
    return new Promise((resolve) => {
        resolve(user);
    });
}

//결과를 반환하는 함수
function getResult(user) {
    //Promise 객체 반환
    return new Promise((resolve, reject) => {
        //성공 시 성공 메시지와 유저명 반환
        resolve(`success register ${user.name}`);
    });
}

function registerByPromise(user) {
    //비동기 호출이지만, 순서를 지켜서 실행
    const result = saveDB(user)
                    .then(sendEmail)
                    .then(getResult)
                    .catch(error => new Error(error))
                    //성공, 실패 여부에 관계없이 실행
                    .finally(() => console.log("완료!"));
    //아직 완료 되지 않았으므로 지연(pending) 상태
    console.log(result);
    return result;
}

const myUser = { email: "node@test.com", password: "1234", name: "node" };
const result = registerByPromise(myUser);
//결과값이 Promise 이므로 then() 메소드에 함수를 넣어서 결과값을 볼 수 있음
result.then(console.log)
// allResult = Promise.all([ saveDB(myUser), sendEmail(myUser), getResult(myUser) ]);
// allResult.then(console.log);