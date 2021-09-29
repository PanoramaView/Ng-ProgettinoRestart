import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostShowComponent } from './posts/post-list/post-show/post-show.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostService } from './posts/post.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostShowComponent,
    CommentsComponent,
    CommentEditComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule { }
