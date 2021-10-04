import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: string;
  editMode = false;
  postForm: FormGroup; //form is a propriety;

  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm(); // create form
      }
    )
  }
  onSubmit() {
    if (this.editMode) {
      //this.postService.updatePost(this.id, newPost);
      //uguale a
      // add Posts to BE call put API
      this.postService.updatePost(this.id, this.postForm.value);
      //this.router.navigate(['../']); //torna indietro prima dell'id
      this.back(); // torna indietro all'id
    } else {
      //this.postService.addPost(newPost);
      //uguale a 
      // add Posts to BE call put API
      this.postService.addPost(this.postForm.value);
      //this.dataStorageService.storePosts();
    }
  }
  back(): void {
    this.location.back()
  }


  onAddComment() {
    (<FormArray>this.postForm.get('comments')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'text': new FormControl(null, [
          Validators.required
        ])
      })
    );
  }
  onDeleteComment(index: number) {
    (<FormArray>this.postForm.get('comments')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['/posts']);
  }

  // to initialize our Form
  private initForm() {
    let postTitle = '';
    let postAuthor = '';
    let postDescription = '';
    //comments
    let postComments = new FormArray([]);

    if (this.editMode) { // if editMode, load the post data into the input boxes
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postAuthor = post.author;
      postDescription = post.body;

      // comments
      if(post['comments']) {
        for(let comment of post.comments) {
          postComments.push(
            new FormGroup({
            'name': new FormControl(comment.name, Validators.required),
            'text': new FormControl(comment.text, [
              Validators.required,
            ])
          })
          );
        }
      }
    }
    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required), // if we are editing it will load the postTitle, if not it will load the default empty string value
      'author': new FormControl(postAuthor, Validators.required),
      'description': new FormControl(postDescription, Validators.required),
      'comments': postComments,
    });
  }
  get controls() { // a getter!
    return (<FormArray>this.postForm.get('comments')).controls;
  }
}
