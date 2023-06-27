/**
 * 현재 상영 영화 순위를 20위까지 Promise 를 사용해 확인하는 코드
 * axios 를 사용
 */

const axios = require("axios");
//영화 순위 정보 URL
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
    .get(url)   //GET 요청
    .then((result) => {   //결과값 처리
        if (result.status != 200) {   //상태가 200 이 아니면 에러
            throw new Error("요청에 실패했습니다!");
        }
        if (result.data) {    //result.data 가 있으면 결과를 반환
            return result.data;
        }
        throw new Error("데이터가 없습니다!");    //data 가 없으면 에러
    })
    .then((data) => {     //result.data 의 데이터를 처리
        //data.articleList 데이터가 없거나 data.articleList 데이터 크기가 0이면 에러
        if (!data.articleList || Object.keys(data.articleList).length === 0) {
            throw new Error("데이터가 없습니다!");
        }
        return data.articleList;    //영화 리스트를 반환
    })
    .then((articles) => {
        //영화 리스트를 제목과 순위 정보로 분리
        return articles.map((articles, idx) => {
            return { title: articles.title, rank: idx + 1 };
        });
    })
    .then((results) => {
        //받은 영화 리스트 정보 출력
        for (let movieInfo of results) {
            console.log(` [${movieInfo.rank}위] ${movieInfo.title} `);
        }
    })
    //중간에 발생된 에러들을 처리
    .catch((err) => {
        console.log("<<에러 발생!>>")
        console.log(err);
    });