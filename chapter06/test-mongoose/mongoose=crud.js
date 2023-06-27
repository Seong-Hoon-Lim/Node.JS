/**
 * 몽구스와 익스프레스로 CRUD API 생성하는 코드
 * mongoose=crud.js 의 스키마를 테스트
 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false);   //설정해줘야 경고가 뜨지 않음

const app = express();
app.use(bodyParser.json());   //HTTP 에서 Body 를 파싱하기 위한 미들웨어 추가
app.listen(3000, async () => {
    console.log("Server Started!");
    const mongoDBUri = "mongodb+srv://hooney200:hooney200@cluster0.155h4r3.mongodb.net/?retryWrites=true&w=majority";

    //몽고DB 에 커넥션 맺기
    mongoose
        .connect(mongoDBUri)
        .then(console.log("Connected to MongoDB"));
});
//모든 person 데이터 출력
app.get("/person", async (req, res) => {
    //person 컬렉션에 있는 모든 person 도큐먼트르 list 형태로 출력
    const person = await Person.find({});
    res.send(person);
})
//특정 이메일로 person 찾기
app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});
//person 데이터 추가하기
app.post("/person", async (req, res) => {
     const person = new Person(req.body);
     await person.save();
     res.send(person);
     //위의 코드와 똑같은 동작
     // const result = await Person.create(req.body);
     // res.send(result);
});
//person 데이터 수정하기
app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});
//person 데이터 삭제하기
app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});
