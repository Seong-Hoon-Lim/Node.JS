/**
 * Nest.js 의 컨트롤러 코드
 */
import {Controller, Get} from "@nestjs/common";

/*
 * 컨트롤러 데코레이터 (Java Spring 의 어노테이션 과 같음)
 * 컨트롤러 클래스는 Module 에서 포함되어야 하므로 export 를 붙임
 */
@Controller()
export class HelloController {
    @Get()
    hello() {
        return "안녕하세요! NestJS 로 만든 첫 애플리케이션입니다!";
    }
}