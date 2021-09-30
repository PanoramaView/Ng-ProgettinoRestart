import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Post } from './post.model';
import { DataStorageService } from '../shared/data-storage.service';
import { PostService } from './post.service';


@Injectable()
export class PostsResolverService implements Resolve<Post[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private postsService: PostService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const posts = this.postsService.getPosts();

        if (posts.length === 0) {
            return this.dataStorageService.fetchPosts();
        } else {
            return posts;
        }
    }
}