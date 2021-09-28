import { Component, OnInit } from '@angular/core';
import { Comment } from '../shared/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [
    new Comment('Apples', '123'),
    new Comment('Tomatoes', '10'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
