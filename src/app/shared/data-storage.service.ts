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

  storePosts() {
    const posts = this.postService.getPosts();
    console.table(posts);
    this.http
      .put(
        'https://spindox-blog.herokuapp.com/api/posts',
        //{ data: posts }
        posts
      )
      .subscribe(response => {
        console.log(response);
      });
  }
  fetchPosts1() {
    return this.http.get<{ data: Post[] }>('https://spindox-blog.herokuapp.com/api/posts')
      // how do I add the default value???
      // .pipe(map(posts => {
      //   return posts.map(post => {
      //     return { ...posts, }
      //   })
      // }))
      // .subscribe(resp => {
      //   console.log("Fetched Data: ")
      //   console.log(resp.data);
      //   this.postService.setPosts(resp.data);
      // });
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
}
