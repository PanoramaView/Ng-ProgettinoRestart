import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostService] //import post.service that has the posts. All posts.components will share the same instance of the Service
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
