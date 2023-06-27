/**
 * blog 게시글의 데이터 타입을 정의 하는 코드
 * 타입스크립트는 데이터만 가지고 있는 타입을 선언할 때
 * 클래스보다는 인터페이스를 많이 사용함.
 */

//게시글의 타입을 인터페이스로 정의
export interface PostDto {
    id: string,         //NOT NULL
    title: string,      //NOT NULL
    content: string,    //NOT NULL
    name: string,       //NOT NULL
    createdDt: Date,    //NOT NULL
    updatedDt?: Date;   //NULL 허용
}