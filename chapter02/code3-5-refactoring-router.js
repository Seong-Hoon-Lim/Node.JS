/**
 * 라우팅 관련 코드를 Map 을 사용해서
 * 리팩토링 해보기
 */

const http = require("http");
const url = require("url");     //url 모듈을 로딩하고 변수에 할당
http
    .createServer((req, res) => {
        //url 모듈을 사용해 req 요청으로 받은 url의 path명을 얻어내서 변수에 할당
        const path = url.parse(req.url, true).pathname;
        res.setHeader("Content-Type", "text/html", "charset=UTF-8");
        /*
         객체와 함께 in 연산자를 사용하면 객체의 key 가 있는지 검사를 진행
         */
        if (path in urlMap) {           //urlMap에 path가 있는지 확인
            urlMap[path](req, res);     //urlMap에 path값으로 매핑된 함수를 실행
        }
        else {
            notFound(req, res);
        }
    })
    .listen("3000", () => console.log("라우터를 리팩토링해보자!"));

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

//라우터 규칙 매핑 key로 path가 들어가고 value에 함수를 할당
//user(), feed() 함수 위에 선언 됬을 경우 에러 발생됨
const urlMap = {
    "/": (req, res) => res.end("Home"),
    "/user": user,
    "/feed": feed,
};