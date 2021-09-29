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
    return this.http.get<any>('https://spindox-blog.herokuapp.com/api/posts')
      .subscribe({
        next: data => {
          this.totalAngularPackages = data.total;
        console.log('Fetched Data' + this.totalAngularPackages);
        // this.postService.setPosts(posts);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!' + error);
      }
      });
  }

  fetchPosts1() {
    return this.http.get<Post[]>('https://spindox-blog.herokuapp.com/api/posts')
    // this.http
    //   .get<Post[]>(
    //     'https://spindox-blog.herokuapp.com/api/posts.json'
    //   )
      .subscribe(posts => {
        console.log('Fetched Data' + posts);
        // this.postService.setPosts(posts);
      });
  }
}
