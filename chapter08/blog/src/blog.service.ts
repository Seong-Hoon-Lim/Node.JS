/**
 * blog 서비스의 코드
 * BlogRepository 를 사용함
 */

import { PostDto } from './blog.model';
import {BlogFileRepository, BlogRepository} from "./blog.repository";
import { Injectable } from "@nestjs/common";
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    // blogRepository: BlogRepository;
    //
    // //BlogRepository 객체 생성
    // constructor() {
    //     this.blogRepository = new BlogFileRepository();
    // }

    //생성자를 통한 의존성 주입
    constructor(private blogRepository: BlogMongoRepository) {}

    //모든 게시글 가져오기
    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    //게시글 작성
    createPost(postDto: PostDto) {
        this.blogRepository.createPost(postDto);
    }

    //게시글 하나 가져오기
    async getPost(id): Promise<PostDto> {
        return await this.blogRepository.getPost(id);
    }

    //게시글 삭제
    delete(id) {
        this.blogRepository.deletePost(id);
    }

    //게시글 수정
    updatePost(id, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto);
    }
}