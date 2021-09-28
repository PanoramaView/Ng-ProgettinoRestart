import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Comment } from "../shared/comment.model";
// import { Subject } from "rxjs/Subject";
import { Post } from "./Post.model";

/* PostService is where we manage our Posts */
@Injectable()
export class PostService {
    postsChanged = new Subject<Post[]>();
    //PostSelected = new Subject<Post>(); /* Object instantiated with EventEmitter, that will hold Post data */

    private posts: Post[] = [
        new Post(
          'Titlex',
          'Authorx',
          'Testox',
        //   [
        //     new Comment('Meat', '1'),
        //     new Comment('French Fries', '20')
        //   ]
          ),
        new Post(
          'Titlex2',
          'Authorx2',
          'Testox2',
        //   [
        //     new Comment('Meat', '1'),
        //     new Comment('French Fries', '20')
        //   ]
          ),
      ];

    constructor(){}
    /* The only way to get the posts[] from outside */
    getPosts(){
        return this.posts.slice(); /* will return a copy of the array posts[]*/
    }

    getPost(id: number){
        return this.posts[id];
    }

    addPost(Post: Post) {
        this.posts.push(Post);
        this.postsChanged.next(this.posts.slice());
    }

    updatePost(index: number, newPost: Post) {
        this.posts[index] = newPost;
        this.postsChanged.next(this.posts.slice());

    }
}