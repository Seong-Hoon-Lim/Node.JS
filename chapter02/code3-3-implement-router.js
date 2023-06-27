/**
 * code3-2-implement-router.js 의 코드를
 * 라우터와 실행하는 함수의 코드를 분리해서
 * 리팩토링 해보기
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
    .listen("3000", () => console.log("라우터를 만들어보자!"));

const user = (req, res) => {
    res.end(`[user] name: Tom, age: 30`);
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