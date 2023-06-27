/**
 * blog 컨트롤러의 코드
 *
 * '/' : GET - 글 목록 조회
 * '/blog' : POST - 글 작성하기 (id, title, name, content, createdDt, updateDt)
 * '/blog/:id' : PUT - 게시글 아이디가 id 인 글을 수정
 * '/blog/:id' : DELETE - 게시글 아이디가 id 인 글을 삭제
 * '/blog/:id' : GET - 게시글 아이디가 id 인 글을 조회
 */

//데코레이터 함수 import
import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')   //localhost:3000/blog/* 의 모든 요청 처리
export class BlogController {
    // blogService: BlogService;
    // //생성자에서 블로그 서비스 생성
    // constructor() {
    //     this.blogService = new BlogService();
    // }
    constructor(private blogService: BlogService) {}

    //모든 게시물 목록 조회
    @Get()
    getAllPosts() {
        console.log('모든 게시글 가져오기');
        return this.blogService.getAllPosts();
    }

    //게시글 작성
    @Post()
    createPost( @Body() postDto) {  //HTTP 요청의 body 내용을 post 에 할당
        console.log('게시글의 작성');
        this.blogService.createPost(postDto);
        return 'success';
    }

    //해당 되는 id의 게시글 조회(비동기 처리)
    @Get('/:id')
    async getPost( @Param('id') id: string ) {
        console.log(`[id: ${id}]게시글 하나 가져오기`);

        const post = await this.blogService.getPost(id);
        console.log(post);
        return post;
    }

    //해당 되는 id의 게시글 삭제
    @Delete('/:id')
    deletePost( @Param('id') id: string ) {
        console.log('게시글 삭제');
        this.blogService.delete(id);
        return 'success';
    }

    //해당 되는 id의 게시글 수정
    @Put('/:id')
    updatePost( @Param('id') id: string, @Body() postDto) {
        console.log(`[${id}]게시글 업데이트`, postDto);
        return this.blogService.updatePost(id, postDto);
    }
}