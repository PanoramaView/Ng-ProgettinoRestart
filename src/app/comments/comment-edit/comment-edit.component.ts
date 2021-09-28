import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){

  }
  onClear(){

  }
  onDelete(){
    
  }
}
