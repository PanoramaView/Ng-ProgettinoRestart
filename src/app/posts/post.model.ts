import { Comment } from "../shared/comment.model";

export class Post {
    public title: string;
    public author: string;
    public description: string;
    // public comments: Comment[];

  constructor(title: string, author: string, description: string) {
//   constructor(title: string, author: string, description: string, comments: Comment[]) {
    this.title = title;
    this.author = author;
    this.description = description;
    // this.comments = comments;
  }
}
