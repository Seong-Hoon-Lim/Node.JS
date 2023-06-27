/**
 * 몽고DB 연결을 위한 유틸리티 코드
 */

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://hooney200:hooney200@cluster0.155h4r3.mongodb.net/nj_board";

//몽고DB 커넥션 연결 함수 반환
module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
}