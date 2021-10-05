import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../Post.model';
import { PostService } from '../post.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  // posts: Post[];
  id: string;
  postsChangedSubscription: Subscription;
  routeSub: Subscription;

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
        //riguardare qui
        //add here <- chiamata API per runnarlo @load
      })
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

}
