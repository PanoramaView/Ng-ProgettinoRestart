import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
// import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
// import { AuthGuard } from './auth-guard.service';
// import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full'}, 
    { path: 'posts', component: PostsComponent, children:[
        { path: 'new', component: PostEditComponent },
        { path: ':id', component: PostDetailComponent},
        { path: ':id/edit', component: PostEditComponent},
        // { path: ':id', component: PostDetailComponent, resolve:[ PostsResolverService] },
        // { path: ':id/edit', component: PostEditComponent, resolve:[ PostsResolverService] },
    ]},
    //nesting. note: AuthGuard e AuthService needs to be added to the providers in app.module
    //{ path: 'not-found', component: PageNotFoundComponent }, //wildcard url
    // { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!'}},
    { path: '**', redirectTo: '/not-found'} // catch all not existing paths to redirect to not-found
  ]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)], //import the appRoutes
    exports: [RouterModule] // says what is exportable in this module to other modules
})

export class AppRoutingModule{

}