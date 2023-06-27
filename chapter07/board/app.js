/**
 * board 프로젝트에서 MVC 패턴 중 컨트롤러 담당
 * 각 종 컨트롤러 및 라우터 기능을 작성하는 코드
 */

/**
 * 각 모듈 설정
 * @type {e | (() => Express)}
 */
const express = require("express");
const handlebars = require("express-handlebars");
const postService = require("./services/post-service");
const { ObjectId } = require("mongodb");
const app = express();

/**
 * 미들 웨어 설정
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//몽고DB 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");

//템플릿 엔진으로 핸들바 등록(handlebars 는 파일의 확장자로 사용할 이름)
app.engine("handlebars", handlebars.engine());
//웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars");

/*
 __dirname 은 node 를 실행하는 디렉토리 경로를 의미
 상대경로로 되어 있을 경우 문제가 생길 수 있으므로 절대경로로 지정
 */
//view 디렉토리를 views 로 설정
app.set("views", __dirname + "/views");

//핸들바 커스텀 함수 설정
app.engine(
    //handlebars.create() 함수는 handlebars 객체 만들 때 사용
    "handlebars", handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);

/**
 * 게시판 API
 * 경로 별 라우터 설정
 */

//리스트 페이지
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;   //현재 페이지 데이터
    const search = req.query.search || "";    //검색어 데이터
    try {
        //postService.list 에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);
        //리스트 페이지 렌더링
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (error) {
        console.error(error);
        //에러가 나는 경우는 빈 값으로 렌더링
        res.render("home", {title: "테스트 게시판"});
    }
});
//글쓰기 페이지 이동 mode 는 create
app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판", mode: "create" });
});
//글쓰기 처리
app.post("/write", async (req, res) => {
    const post = req.body;
    //글쓰기 후 결과 반환
    //writePost() 함수는 post 에 저장된 내용을 몽고DB 에 저장하고 결과를 반환
    const result = await postService.writePost(collection, post);
    //생성된 도큐먼트의 _id 를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
});
//상세 페이지로 이동
app.get("/detail/:id", async (req, res) => {
    // 게시글 정보 가져오기
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});
//패스워드 체크
//id, password 값을 가져옴(req.body 에서 id, password 데이터를 구조 분해 할당으로 각각 가져옴)
app.post("/check-password", async (req, res) => {
    const { id, password } = req.body;
    // postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
    const post = postService.getPostByIdAndPassword(collection, { id, password });

    // 데이터가 있으면 isExist true, 없으면 isExist false
    if (!post) {
        return res.status(404).json({ isExist: false });
    }
    else {
        return res.json({ isExist: true });
    }
});
// 수정 페이지로 이동 mode는 modify
app.get("/modify/:id", async (req, res) => {
    const { id } = req.params.id;
    // getPostById()  함수로 게시글 데이터를 받아옴
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", { title: "테스트 게시판 ", mode: "modify", post });
});

// 게시글 수정 API
app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };
    // 업데이트 결과
    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

// 게시글 삭제 API
app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;
    //DB 연결이 안되는 등 예외 상황이 있을 수 있으므로 try-catch 로 예외처리
    try {
        // collection의 deleteOne을 사용해 게시글 하나를 삭제
        const result = await collection.deleteOne({
            _id: ObjectId(id),
            password: password,
        });
        // 삭제 결과가 잘못된 경우의 처리
        //deletedCount 는 삭제한 도큐먼트 개수로 삭제 성공이니 값이 1이 아니면 삭제 실패
        if (result.deletedCount !== 1) {
            console.log("삭제 실패");
            return res.json({ isSuccess: false });
        }
        return res.json({ isSuccess: true });
    } catch (error) {
        // 에러가 난 경우의 처리
        console.error(error);
        return res.json({ isSuccess: false });
    }
});

// 댓글 추가 API
app.post("/write-comment", async (req, res) => {
    const { id, name, password, comment } = req.body; // body에서 데이터를 가지고 오기(구조 분해 해서 할당 받음)
    const post = await postService.getPostById(collection, id); // id로 게시글의 정보를 가져오기
    console.log(post);
    // 게시글에 기존 댓글 리스트가 있으면 추가
    if (post.comments) {
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else {
        // 게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }
    // 업데이트하기. 업데이트 후에는 상세페이지로 다시 리다이렉트
    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

// 댓글 삭제 API
app.delete("/delete-comment", async (req, res) => {
    const { id, idx, password } = req.body;

    // 게시글(post)의 comments 안에 있는 특정 댓글 데이터를 찾기
    const post = await collection.findOne(
        {
            _id: ObjectId(id),
            //$elemMatch 연산자는 도큐먼트 안에 있는 리스트에서 조건에 해당하는 데이터가 있으면 도큐먼트를 결과값으로 줌.
            comments: { $elemMatch: { idx: parseInt(idx), password } },
        },
        postService.projectionOption
    );

    // 데이터가 없으면 isSuccess : false를 주면서 종료
    if (!post) {
        return res.json({ isSuccess: false });
    }

    // 댓글 번호가 idx 이외인 것만 comments에 다시 할당 후 저장
    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    return res.json({ isSuccess: true });
});

/*
 MongoDB 연결은 애플리케이션이 시작될 때 한 번 수행되며,
 데이터베이스 컬렉션에 대한 참조를 collection 변수에 저장하여
 라우터에서 사용할 수 있도록 해줌.
 */
let collection;
app.listen(3000, async () => {
    console.log("Server Started!");
    //mongodbConnection() 결과는 mongoClient
    const mongoClient = await mongodbConnection();
    //mongoClient.db()로 DB 선택 collection() 으로 컬렉션 선택 후 collection 에 할당
    collection = mongoClient.db().collection("post");
    console.log("MongoDB Connected!");
});