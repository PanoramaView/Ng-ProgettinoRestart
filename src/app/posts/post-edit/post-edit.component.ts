import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  tags: Array<string> = ['tag1', 'tag2', 'tag3'];

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
    //edit post
    if (this.editMode) {
      //this.postService.updatePost(this.id, newPost);
      //uguale a
      // add Posts to BE call put API
      this.postService.updatePost(this.id, this.postForm.value);
      //this.router.navigate(['../']); //torna indietro prima dell'id
      this.dataStorageService.editPost(this.id, this.postForm.value);
      this.back(); // torna indietro all'id
    } 
    else 
    //creazione new post
    {
      //this.postService.addPost(newPost);
      //uguale a 
      // add Posts to BE call put API
      //this.postService.addPost(this.postForm.value); //only in UI
      console.log("this.postForm.value");
      console.log(this.postForm.value);
      this.dataStorageService.storePosts(this.postForm.value);
      this.back();
    }

  }
  back(): void {
    this.location.back()
  }

  getSelectedTags() {
  }

  addTags() {
  }

  onAddComment() {
    (<FormArray>this.postForm.get('comments')).push(
      new FormGroup({
        'author': new FormControl(null, Validators.required),
        'text': new FormControl(null, Validators.required)
      })
    );
  }
  onDeleteComment(index: number) {
    (<FormArray>this.postForm.get('comments')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['/posts']);
  }

  // to initialize our Form
  private initForm() {
    let postTitle = '';
    let postAuthor = '';
    let postDescription = '';
    //comments
    let postComments = new FormArray([]);
    let postTags = new FormArray([
        new FormControl('') //wildcard
    ]);

    if (this.editMode) { // if editMode, load the post data into the input boxes
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postAuthor = post.author;
      postDescription = post.body;

      // comments
      if (post['comments']) {
        for (let comment of post.comments) {
          postComments.push(
            new FormGroup({
              'author': new FormControl(comment.author, Validators.required),
              'text': new FormControl(comment.text, [
                Validators.required,  
              ])
            })
          );
        }
      }

      //tags
      // if (post['tags']) {
      //   for (let tag of post.tags) {
      //     postTags.push(
      //       new FormGroup({
      //         'name': new FormControl(tag.name)
      //       })
      //     );
      //   }
      // }

    }
    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required), // if we are editing it will load the postTitle, if not it will load the default empty string value
      'author': new FormControl(postAuthor, Validators.required),
      'body': new FormControl(postDescription, Validators.required),
      'comments': postComments,
      'tags': postTags
    });
  }
  get commentsArray() { // a getter!
    return (<FormArray>this.postForm.get('comments')).controls;
  }

  get tagsArray() {
    return (<FormArray>this.postForm.get('tags')).controls;
  }
}
