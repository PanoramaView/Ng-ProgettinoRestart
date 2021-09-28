import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];/* the data are in the post.service, that will be injected */

    /* inject our Service */
    constructor(private postService: PostService,
             private router: Router,
             private route: ActivatedRoute) { }

  ngOnInit() {
    this.postService.postsChanged
        .subscribe(
          (posts: Post[]) => {
            this.posts = posts;
          }
        )
    this.posts = this.postService.getPosts();
  }

  onNewPost(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}