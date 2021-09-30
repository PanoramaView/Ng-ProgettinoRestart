import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from '../posts/post.model';
import { PostService } from '../posts/post.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  errorMessage: string;
  totalAngularPackages: string;

  constructor(private http: HttpClient, private postService: PostService) {}

  storePosts() {
    const posts = this.postService.getPosts();
    this.http
      .put(
        'https://ng-db-f74bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        posts
      )
      .subscribe(response => {
        console.log(response);
      });
  }
  fetchPosts() {
    return this.http.get<{data: Post[]}>('https://spindox-blog.herokuapp.com/api/posts')
    // this.http
    //   .get<Post[]>(
    //     'https://spindox-blog.herokuapp.com/api/posts.json'
    //   )
      .subscribe(posts => {
        console.log("Fetched Data: ")
        console.log(posts);
        this.postService.setPosts(posts.data);
        console.log(posts.data[1]);
      });
  }
}
