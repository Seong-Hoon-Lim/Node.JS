/**
 * MongoDB CRUD API 코드
 */
const url = require("url");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hooney200:hooney200@cluster0.155h4r3.mongodb.net/test?retryWrites=true&w=majority";

/*
 userNewUrlParser 옵션은 몽고DB 드라이버 3.0 이후로는 불필요
 */
//MongoClient 생성
const client = new MongoClient(uri);

async function main() {
    try {
        //커넥션을 생성하고 연결 시도
        await client.connect();
        console.log('MongoDB 접속 성공!');
        //test DB 의 person 컬렉션 가져오기
        const collection = client.db('test').collection('person');
        //문서 하나 추가
        await collection.insertOne({ name: 'node', age: 30 });
        console.log('문서 추가 완료!');
        //문서 찾기
        const documents = await collection.find({ name: 'node' }).toArray();
        console.log('찾은 문서:', documents);
        //문서 갱신하기
        await collection.updateOne({ name: 'node' }, { $set: { age: 31 } });
        console.log('문서 업데이트');
        //갱신된 문서 확인하기
        const updatedDocuments = await collection.find({ name: 'node' }).toArray();
        console.log('갱신된 문서:', updatedDocuments);
        //문서 삭제하기
        // await collection.deleteOne({ name: 'node' });
        // console.log('문서 삭제')

        //연결 끊기
        await client.close();
    }
    catch (err) {
        console.error(err);
    }
}

main();