/**
 * 게시판의 리스트 정보 가져오기, 저장하기, 수정하기, 삭제하기 등
 * 서비스 로직 코드
 */

const paginator = require("../utils/paginator");
const {ObjectId} = require("mongodb");

//글 목록 로직
async function list(collection, page, search) {
    const perPage = 10;
    //title 이 search 와 부분일치하는지 확인
    const query = {title: new RegExp(search, "i")};
    //limit 는 10개만 가져온다는 의미, skip 은 설정된 개수 만큼 건너뜀. 생성일 역순으로 정렬
    const cursor = collection.find(query, {limit: perPage, skip: (page - 1) * perPage}).sort({createdDt: -1,});
    //검색어에 걸리는 게시물의 총합
    const totalCount = await collection.count(query);
    //커서로 받아온 데이터를 리스트로 변경
    const posts = await cursor.toArray();
    //페이지네이터 생성
    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];
}

//글쓰기 로직
async function writePost(collection, post) {
    post.hits = 0;    //조회수
    post.createdDt = new Date().toISOString();    //생성일시(ISO 포맷으로 저장)
    return await collection.insertOne(post);      //몽고DB 에 post 저장 후 결과 반환
}

//글 목록 로직(패스워드는 노출 할 필요가 없으므로 결과값으로 가져오지 않음)
const projectionOption = {
    projection: {
        //프로젝션(투영) 결과값에서 일부만 가져올 때 사용 (DB 에서 필요한 필드들만 선택해서 가져오는 것)
        password: 0,
        "comments.password": 0,
    },
};

//글 상세 로직
async function getDetailPost(collection, id) {
    //몽고DB Collection 의 findOneAndUpdate() 함수를 사용, 게시글을 읽을 때 마다 hits 를 1 증가
    return await collection.findOneAndUpdate({_id: ObjectId(id)}, {
        $inc: {
            hits:
                1
        }
    }, projectionOption);
}

//id 와 password 로 데이터를 가져오기
async function getPostByIdAndPassword(collection, { id, password }) {
    //  ❶ findOne() 함수 사용
    return await collection.findOne(
        { _id: ObjectId(id), password: password },
        projectionOption
    );
}

// ❷ id로 데이터 불러오기
async function getPostById(collection, id) {
    return await collection.findOne({ _id: ObjectId(id) }, projectionOption);
}

// ❸ 게시글 수정
async function updatePost(collection, id, post) {
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    return await collection.updateOne({ _id: ObjectId(id) }, toUpdatePost);
}

//require() 로 파일을 임포트 시 외부로 노출하는 객체
module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostById,
    getPostByIdAndPassword,
    updatePost,
};