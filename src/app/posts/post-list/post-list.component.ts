import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [
    new Post(
      'Titlex',
      'Authorx',
      'Testox'
      ),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

// export class PostListComponent implements OnInit {
//     // @Output() postWasSelected = new EventEmitter<post>(); removed after service injection
//     posts: Post[]; /* empty cuz now the data are in the post.service, that will be injected */

//     /* inject our Service */
//     constructor(private postService: PostService,
//       private router: Router,
//       private route: ActivatedRoute) { }

//   ngOnInit(): void {
//   }
// }
//   ngOnInit() {
//     this.PostService.postsChanged
//         .subscribe(
//           (posts: Post[]) => {
//             this.posts = posts;
//           }
//         )
//     this.posts = this.PostService.getposts();
//   }

//   /* onpostSelected(post: post){
//     this.postWasSelected.emit(post);
//     removed after service injection
//   } */

//   onNewPost(){
//     this.router.navigate(['new'], {relativeTo: this.route})
//   }
// }