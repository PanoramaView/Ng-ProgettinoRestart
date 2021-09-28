//import { comment } from "../shared/comment.model";

export class Post {
    public title: string;
    public author: string;
    public description: string;
    //public comments: comment[];

  constructor(title: string, author: string, description: string) {
    this.title = title;
    this.author = author;
    this.description = description;
    // this.comments = comments;
  }
}
