import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../Post.model';
import { PostService } from '../post.service';
import { Location } from '@angular/common';

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
    private location: Location)
    { }

  ngOnInit() {
    this.route.params.subscribe( //with subscribe, it is responsive to changes
      (params: Params) => {
        this.id = +params['id'];
        this.post = this.postService.getPost(this.id);
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.postService.deletePost(this.id);
    //this.back(); non va boh
    this.router.navigate(['/posts']);
  }

  back(): void {
    this.location.back()
  }

}
