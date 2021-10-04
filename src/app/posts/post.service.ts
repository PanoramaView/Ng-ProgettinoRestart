import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Comment } from "../shared/comment.model";
import { Post } from "./Post.model";

/* PostService is where we manage our Posts */
@Injectable()
export class PostService {
    postsChanged = new Subject<Post[]>();
/* Object instantiated with EventEmitter, that will hold Recipe data 
an Observable that allows
*/

    private posts: Post[] = [];
    // private posts: Post[] = [
    //   new Post(
    //     ['tag1', 'tag2'],
    //     '0',
    //     'Titolox',
    //     'bodyx',
    //     'Authorx',
    //     [
    //       new Comment('Capra Di Montagna', 'ok'),
    //       new Comment('Aldo', 'Buongiorno Marco')
    //     ],
    //     Date.now(),
    //     Date.now()
    //     ),
    //     new Post(
    //       ['tag1', 'tag2'],
    //       '0',
    //       'Titolox',
    //       'bodyx',
    //       'Authorx',
    //       [
    //         new Comment('Capra Di Montagna', 'ok'),
    //         new Comment('Aldo', 'Buongiorno Marco')
    //       ],
    //       Date.now(),
    //       Date.now()
    //       ),
    //   ];

    constructor(private http: HttpClient){
    }
    // overwrite the Post array API
    setPosts(posts: Post[]){
        this.posts = posts; 
        this.postsChanged.next(this.posts.slice());
        // this.postsChanged.next([...this.posts]);
    }

    /* The only way to get the posts[] from outside */
    getPosts(){
        return this.posts.slice(); /* will return a copy of the array posts[]*/
    }

    getPost(id: string){
        return this.posts.find((post) => post._id === id);
    }

    addPost(Post: Post) {
        this.posts.push(Post); //  push the new Post in the posts[](copy)
        this.postsChanged.next(this.posts.slice()); //updates the real posts[]
    }

    updatePost(id: string, newPost: Post) {
        // with the new index
        const index = this.posts.findIndex((post) => post._id === id); // return index of the array ;
        this.posts[index] = newPost; 
        this.postsChanged.next(this.posts.slice());

    }
    deletePost(id: string){
        const index = this.posts.findIndex((post) => post._id === id); // return index of the array ;
      this.posts.splice(index, 1);
      this.postsChanged.next(this.posts.slice());
    }
}