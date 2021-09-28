import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  editMode = false;
  postForm: FormGroup; //form is a propriety;

  constructor(private route: ActivatedRoute
    , private postService: PostService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm(); // create form
      }
    )
  }
  onSubmit() {
    if ( this.editMode) {
      //this.postService.updatePost(this.id, newPost);
      //uguale a
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      //this.postService.addPost(newPost);
      //uguale a 
      this.postService.addPost(this.postForm.value);
    }

  }
  onAddComment(){

  }

  // to initialize our Form
  private initForm() {
    let postTitle = '';
    let postAuthor = '';
    let postDescription = '';
    //comments
    // let postComments = new FormArray([]);
    
    if (this.editMode) { // if editMode, load the post data into the input boxes
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postAuthor = post.author;
      postDescription = post.description;

      // if(post['comments']) {
      //   for(let comment of post.comments) {
      //     postComments.push(
      //       new FormGroup({
      //       'name': new FormControl(comment.name, Validators.required),
      //       'text': new FormControl(comment.text, [
      //         Validators.required,
      //         Validators.pattern(/^[1-9]+[0-9]*$/),
      //       ])
      //     })
      //     );
      //   }
      // }
    }
    this.postForm = new FormGroup({
      'name': new FormControl(postTitle, Validators.required), // if we are editing it will load the postTitle, if not it will load the default empty string value
      'author': new FormControl(postAuthor, Validators.required),
      'description': new FormControl(postDescription, Validators.required),
      // 'comments': postComments,
    });
  }
  // get controls() { // a getter!
  //   return (<FormArray>this.postForm.get('comments')).controls;
  // }
}
