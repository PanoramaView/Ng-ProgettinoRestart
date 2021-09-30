import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Comment } from "../shared/comment.model";
// import { Subject } from "rxjs/Subject";
import { Post } from "./Post.model";

/* PostService is where we manage our Posts */
@Injectable()
export class PostService {
    postsChanged = new Subject<Post[]>();

    private posts: Post[] = [
        new Post(
          'Titlex',
          'Authorx',
          'Testox',
          [
            new Comment('Capra Di Montagna', 'ok'),
            new Comment('Aldo', 'Buongiorno Marco')
          ]
          ),
        new Post(
          'Titlex2',
          'Authorx2',
          'Testox2',
          [
            new Comment('xx', 'lol'),
            new Comment('x', 'ciao')
          ]
          ),
      ];

    constructor(private http: HttpClient){
    }
    // overwrite the Post array API
    setPosts(posts: Post[]){
        this.posts = posts;
        this.postsChanged.next(this.posts.slice());
    }

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
    deletePost(index: number){
      this.posts.splice(index, 1);
      this.postsChanged.next(this.posts.slice());
    }
}