/**
 * Nest JS 가동 시 실행 되는 코드
 */

import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

/*
 NestJS 에서는 최초로 실행되는 함수를 bootstrap() 으로
 이름을 짓는 것이 관례임.
 */
//NestJS 를 시작시키는 함수
async function bootstrap() {
    //NestFactory 를 사용해서 NestApplication 객체 생성
    const app = await NestFactory.create(HelloModule);
    //3000번 포트로 서버 가동
    await app.listen(3000, () => {
        console.log("서버 시작!");
    });
}

bootstrap();