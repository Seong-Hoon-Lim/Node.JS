/**
 * code3-3-implement-router.js 의 코드를
 * 매개변수에 따라 동적으로 응답 하도록 변경
 */

const http = require("http");
const url = require("url");     //url 모듈을 로딩하고 변수에 할당
http
    .createServer((req, res) => {
        //url 모듈을 사용해 req 요청으로 받은 url의 path명을 얻어내서 변수에 할당
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html", "charset=UTF-8");

        if (path === "/user") {
            user(req, res);     //user() 함수 실행
        }
        else if (path === "/feed") {
            feed(req, res);     //feed() 함수 실행
        }
        else {
            notFound(req, res);     //notFound() 함수 실행
        }

    })
    .listen("3000", () => console.log("라우터를 동적으로 만들어보자!"));

const user = (req, res) => {
    //쿼리 스트링 데이터를 userInfo 에 할당
    const userInfo = url.parse(req.url, true).query;
    //결과값으로 이름과 나이 설정
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
    res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>
        `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");  //결과값으로 에러 메시지 설정
};