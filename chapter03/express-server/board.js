/**
 * 익스프레스를 활용한 간단한 게시판 API 서버 만들기 (DB 사용X, 휘발성 게시판)
 * 목록 가져오기, 글 작성하기, 글 삭제하기 3가지 API 기능
 * REST API 원칙에 따라 생성
 * '/' : GET 메소드 / 게시판 목록을 가져옴
 * '/posts' : POST 메소드 / 게시판에 글 작성, id, title, name, text, createdDt 로 구성
 * 'posts/:id' : DELETE 메소드 / 게시글 아이디가 id인 글을 삭제
 */

const express = require("express");
const app = express();
let posts = [];   //게시글 리스트로 사용할 posts에 빈 List 할당, 글 삭제 시 삭제된 목록으로 다시 재할당 되므로 let 선언

/*
 req.body를 사용하려면 JSON 미들웨어를 사용해야 함
 사용하지 않으면 undefined로 반환 됨

 익스프레스에서 미들웨어는 요청과 응답 사이에 로직을 추가할 수 있는 함수를 제공
 요청이 들어오고 나갈 때 전후 처리를 지원하는 역할을 함.

 application/x-www-form-urlencoded 타입이란 body에
 key=value&key2=value2 같은 key=value 조합 형태의 데이터

 res.end() 함수는 함수의 매개변수로 문자열과 바이트 버퍼 형식만 넣을 수 있으므로
 리스트와 JSON 데이터를 처리할 수 있는 res.json() 함수를 사용해야 함.

 */
app.use(express.json());    //JSON 미들웨어 활성화

//POST 요청 시 Content-Type 이 application/x-www-form-urlencoded 인 경우 파싱
app.use(express.urlencoded({ extended: true }));  //JSON 미들웨어와 함께 사용

//'/' 로 요청이 오면 실행
app.get("/", (req, res) => {
    //게시글 리스트를 JSON 형식으로 보여줌
    res.json(posts);
});

//'/posts' 로 요청이 오면 실행
app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;   //HTTP 요청의 body 데이터를 변수에 할당

    //게시글 리스트에 새로운 게시글 정보 추가
    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
    res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
    //app.delete 에 설정한 path 정보에서 id 값을 가져옴
    const id = req.params.id;
    /*
     filter() 함수는 배열에서 특정 요소를 삭제할 때 사용
     +id 는 문자열 id를 숫자형 Integer 로 parseInt 한다는 것
     */
    //글 삭제 로직(filter() 함수를 사용하여 입력받은 게시글 id와 기존 게시글의 id가 다를 때만 filteredPosts 에 새로 할당)
    const filteredPosts = posts.filter((post) => post.id !== +id);
    //글 삭제 확인
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;

    /*
     빠른 반환 기법 적용. 코드 가독성 증가
     if 문이 중첩되는 경우 else 를 조금이라도 사용하지 않을 수 있음.
     */
    //posts의 데이터 개수가 변경되었으면 삭제 성공
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
    //posts의 데이터 개수가 변경되지 않음
    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("welcome posts START!");
});