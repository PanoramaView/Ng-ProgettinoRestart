import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../Post.model';
import { PostService } from '../post.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  id: number;

  constructor(private postService: PostService,
    private route: ActivatedRoute,// fetch route id
    private router: Router,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe( //with subscribe, it is responsive to changes
      (params: Params) => {
        this.id = +params['id'];
        this.post = this.postService.getPost(this.id);

        //riguardare qui
        // se post é vuoto
        if (!this.post) {
          //chiamata API
          this.dataStorageService.fetchPosts();

          // this.postsChangedSubscription = this.postService.postsChanged
          //   .subscribe(
          //     (posts: Post[]) => {
          //       this.post = posts;
          //     }
          //     )
             }
        //riguardare qui
        //add here <- chiamata API per runnarlo @load
      })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/posts']);
  }

}
