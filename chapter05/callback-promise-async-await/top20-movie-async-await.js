/**
 * 현재 상영 영화 순위를 20위까지 async, await 를 사용해 확인하는 코드
 * axios 를 사용
 */

const axios = require("axios");
//영화 순위 정보 URL
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

//await 를 사용하기 위해 async 를 붙임
async function getTop20Movies() {
    // const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try {
        //네트워크에서 데이터를 받아오므로 await 로 기다림
        const result = await axios.get(url);
        //결과값(result)에는 data 프로퍼티가 있음
        const { data } = result;
        //data 또는 articleList 가 없을 때 예외 처리
        if (!data.articleList || Object.keys(data.articleList).length === 0) {
            throw new Error("데이터가 없습니다!");
        }
        //data 에서 필요한 영화 제목과 순위 정보를 뽑아냄
        const movieInfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });

        //데이터 출력
        for (let movieInfo of movieInfos) {
            console.log(` [${movieInfo.rank}위] ${movieInfo.title} `);
        }
    }
    catch (err) {
        //예외 처리는 기존 코드와 같게 try catch 로 감쌈
        throw new Error(err);
    }
}

//await 를 함수 안에서만 사용 가능하므로 함수 하나 생성 해서 실행
getTop20Movies();