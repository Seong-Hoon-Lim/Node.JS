/**
 * 콜백함수 테스트 코드 (회원가입 3단계 가정)
 * 회원가입 API 호출
 * -> DB 저장 -> 이메일발송 -> 성공메시지 출력
 * @type {*[]}
 */

const DB = [];

//회원가입 API 함수(콜백이 3중으로 중첩된 함수)
function register(user) {
    return saveDB(user, function (user) {   //콜백
        return sendEmail(user, function (user) {    //콜백
            return getResult(user);     //콜백
        });
    });
}

//DB 저장 후 콜백 실행
function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

//이메일 발송 로그만 남기는 코드 실행 후 콜백 실행
function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

//결과를 반환하는 함수
function getResult(user) {
    return `success register ${user.name}`;
}

const result = register({ email: "node@test.com", password: "1234", name: "node" });
console.log(result);