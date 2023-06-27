/**
 * mongoose 스키마 와 도큐먼트 타입 정의 코드
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//블로그이면서 토큐먼트인 타입 정의 (교차 타입)
export type BlogDocument = Blog & Document;

@Schema()   //스키마임을 나타냄
export class Blog {
    @Prop()   //스키마의 프로퍼티임을 나타냄
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updateDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);  //스키마 생성