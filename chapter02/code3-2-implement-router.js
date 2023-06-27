/**
 * 가상의 URL 지정 후
 * localhost:3000/user, localhost:3000/feed
 * 두 요청에 대해 응답하는 서버 생성
 */

const http = require("http");
const url = require("url");     //url 모듈을 로딩하고 변수에 할당
http
    .createServer((req, res) => {
        //url 모듈을 사용해 req 요청으로 받은 url의 path명을 얻어내서 변수에 할당
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html", "charset=UTF-8");

        if (path === "/user") {
            res.end("[user] name: Tom, age: 30");   //'/user' 결과값 설정
        }
        else if (path === "/feed") {        //'/feed' 결과값 설정
            res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>
        `);
        }
        else {
            res.statusCode = 404;
            res.end("404 page not found");  //결과값으로 에러 메시지 설정
        }
    })
    .listen("3000", () => console.log("라우터를 만들어보자!"));