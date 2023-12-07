import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //1)GET/posts
  // 모든 posts를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  //2)GET/post/:id
  //id에 해당되는 posts를 가져온다.
  // 예를 들어 id = 1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id/')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  //3)POST / posts
  //POST를 생성한다.
  @Post()
  postPosts(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.creeatePost(authorId, title, content);
  }

  // 4)PUT/posts/:id
  // id에 해당되는 POST를 변경한다.
  @Put(':id')
  putPost(
    @Param('id') id: string,

    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(title, content, +id);
  }

  // 5)DELETE/posts/:id
  // id에 해당되는 POST를 삭제한다.

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
