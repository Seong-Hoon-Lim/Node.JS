/**
 * code3-5-refactoring-router.js 서버를 익스프레스로 구현
 *
 * res.json() 함수를 사용하면 응답을 JSON 형태로 보여주기도 하고,
 * charset=UTF-8 인코딩을 자동으로 설정해주므로 간단하게 처리가 가능
 *
 * 기존의 const 로 선언된 함수를 function 으로 선언하면서
 * 호이스팅을 사용할 수 있게 됨
 */


const url = require("url");     //url 모듈을 로딩하고 변수에 할당
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("익스프레스로 라우터 리팩토링하기")
})

//GET 메소드의 라우팅 설정
app.get("/", (_, res) => res.end("Home"));
app.get("/user", user);
app.get("/feed", feed);

//'/user' 로 요청이 오면 실행되는 함수
function user(req, res) {
    const user = url.parse(req.url, true).query;

    //결과값으로 유저명과 나이 제공
    res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

/*
 첫번째 매개변수로 '_' 기호가 들어간 경우
 사용하지 않는 변수라도 함수 인터페이스 구조상
 넣을 수 밖에 없을 때 관례
 */
//'/feed' 로 요청이 오면 실행되는 함수
function feed(_, res) {
    res.json(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>
        `);
}