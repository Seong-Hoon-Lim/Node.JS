/**
 * 첫 익스프레스 서버 만들기
 * localhost:3000 으로 접근하면 "헬로 Express" 를 반환하는 서버
 * @type {e | (() => Express)}
 */
const express = require("express");   //express 패키지를 로딩해 express에 할당
const app = express();    //express()를 실행해 express 인스턴스를 만들고 app에 할당
const port = 3000;

//url의 path가 '/' 이면서 http 메소드가 get() 인 경우 콜백 함수를 실행
app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=UTF-8" });    //헤더값 설정
    res.end("헬로 Express");
});

//서버를 가동해 클라이언트의 요청을 기다림
app.listen(port, () => {
    console.log(`START SERVER : use ${port}`);
});