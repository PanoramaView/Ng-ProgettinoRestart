import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from '../posts/post.model';
import { PostService } from '../posts/post.service';

@Injectable()
export class DataStorageService {
  errorMessage: string;
  totalAngularPackages: string;

  constructor(private http: HttpClient, private postService: PostService) { }

  storePosts(post: Post) {
    this.http
      .post(
        'https://spindox-blog.herokuapp.com/api/posts',
        post
      )
      .subscribe(resp => {
        console.log(resp);
      });
  }

  editPost(id: string, post: Post) {
    this.http
      .put<{ data: Post[] }>(
        'https://spindox-blog.herokuapp.com/api/posts/' + id, 
        post)
      .subscribe(resp => {
        console.log(resp);
        
      });
  }

  fetchPosts() {
    this.http.get<{ data: Post[] }>('https://spindox-blog.herokuapp.com/api/posts')
      // how do I add the default value???
      // .pipe(map(posts => {
      //   return posts.map(post => {
      //     return { ...posts, }
      //   })
      // }))
      .subscribe(resp => {
        console.log("Fetched Data: ")
        console.log(resp.data);
        this.postService.setPosts(resp.data);
      });
  }

  fetchPostDetail(id: string) {
    this.http.get<{ data: Post }>('https://spindox-blog.herokuapp.com/api/posts/' + id)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  deletePosts(id: string) {
    this.http
      .delete<{ data: Post }>('https://spindox-blog.herokuapp.com/api/posts/' + id).subscribe(resp =>{
        console.log(resp);
      })
  }
}
