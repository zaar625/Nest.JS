import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * author:string;
 * title:string;
 * content:string;
 * commentCount: number;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_offical',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 10000,
    commentCount: 999,
  },
  {
    id: 2,
    author: 'newjeans_offical',
    title: '뉴진스 혜린',
    content: '노래 연습하고 있는 혜린',
    likeCount: 10000,
    commentCount: 999,
  },
  {
    id: 3,
    author: 'blackpink_offical',
    title: '블랙핑크 로제',
    content: '공연하고 있는 로제',
    likeCount: 10000,
    commentCount: 999,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  async getPostById(id: number) {
    // const post = posts.find((post) => post.id === +id);

    // if (!post) {
    //   throw new NotFoundException();
    // }
    // return post;

    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async creeatePost(authorId: number, title: string, content: string) {
    //1) create -> 저장할 객체를 생성한다.
    //2) save -> create 메서드에서 생성한 객체로 저장한다.
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);
    return newPost;
    //
    // const post = {
    //   id: posts[posts.length - 1].id + 1,
    //   author, //author : author
    //   title,
    //   content,
    //   likeCount: 0,
    //   commentCount: 0,
    // };

    // posts = [...posts, post];

    // return post;
  }

  updatePost(title: string, content: string, postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;

    //save의 기능
    //1) 만약에 데이터가 존재하지 않는다면(id 기준으로) 새로 생성한다.
    //2) 만약에 데이터가 존재한다면 (같은 )
  }

  async deletePost(postId: number) {
    // const post = posts.find((post) => post.id === postId);
    // if (!post) {
    //   throw new NotFoundException();
    // }
    // posts = posts.filter((post) => post.id !== postId);
    // return postId;
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
