import http from "k6/http";

/**
 * 가상유저 100명이 10초 동안
 * http://localhost:8000 에 동시에 계속 요청을 보내는 테스트
 * @type {{duration: string, vus: number}}
 */

//테스트 옵션 지정
export const options = {
    vus: 100,       //가상의 유저 100명 설정
    duration: "10s",    //10초 동안 테스트 진행 선택
};

//테스트에 사용할 함수 지정
export default function () {
    http.get("http://localhost:8000");
}