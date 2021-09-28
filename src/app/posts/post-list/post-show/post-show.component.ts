import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../Post.model';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){

  }
  onDelete(){

  }
}

