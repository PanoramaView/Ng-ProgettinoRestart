import { Component, OnInit } from '@angular/core';
// import { DataStorageService } from '../shared/data-storage.service';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],

  // providers: [PostService] //import post.service that has the posts. All posts.components will share the same instance of the Service
  // ---- NB: service only in the appModule not in .ts ^^^ ----

})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.postService.postsChanged.subscribe(
    //   posts => console.log(posts)
    // );
  }

}

/* example with providers: [PostService] overwriting appmodule.postService
export class PostsComponent implements AfterViewInit {

  constructor(private postService: PostService) { }

  ngAfterViewInit() {

    const posts: Post[] = [
      new Post(
        ['tag1', 'tag2'],
        '0',
        'Titolox',
        'bodyx',
        'Authorx',
        [
        ],
        Date.now(),
        Date.now()
        )
      ];
      
      this.postService.postsChanged.next(posts);
  }

}
 */