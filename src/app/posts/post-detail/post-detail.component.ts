import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../Post.model';
import { PostService } from '../post.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/shared/tags.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  comment: Comment;
  // posts: Post[];
  id: string;
  postsChangedSubscription: Subscription;
  routeSub: Subscription;
  commentForm: FormGroup;

  constructor(private postService: PostService,
    private route: ActivatedRoute,// fetch route id
    private router: Router,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( //with subscribe, it is responsive to changes
      (params: Params) => {
        this.id = params['id'];
        this.post = this.postService.getPost(this.id);

        //riguardare qui
        // se post é vuoto
        if (!this.post) {
          // this.dataStorageService.fetchPostDetail(this.id);
          //chiamata API
          this.dataStorageService.fetchPosts();
          this.postsChangedSubscription = this.postService.postsChanged
            .subscribe(
              (posts: Post[]) => {
                this.post = this.postService.getPost(this.id);
              }
            )
        }
      })
      this.initForm();
  }

  ngOnDestroy(){

    this.routeSub.unsubscribe();

    if(this.postsChangedSubscription){
      this.postsChangedSubscription.unsubscribe();
    }
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.postService.deletePost(this.id);
    this.dataStorageService.deletePosts(this.id);
    this.router.navigate(['/posts']);
  }

  private initForm() {
    let commentAuthor = '';
    let commentText = '';
    this.commentForm = new FormGroup({
      'author': new FormControl(commentAuthor, Validators.required), // if we are editing it will load the postTitle, if not it will load the default empty string value
      'text': new FormControl(commentText, Validators.required),
    });
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
       this.onSubmit();
    }
 }

  onSubmit(){
    this.post.comments.push(this.commentForm.value);

    this.dataStorageService.editPost(this.id, this.post);
    this.commentForm.reset();
  }

  DeleteComment(index: number) {
    
  }

}
