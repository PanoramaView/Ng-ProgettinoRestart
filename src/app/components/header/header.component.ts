import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService){

  }
  onSavePosts(){
    this.dataStorageService.storePosts();
  }
  
  onFetchPosts(){
    this.dataStorageService.fetchPosts();
  }
}
