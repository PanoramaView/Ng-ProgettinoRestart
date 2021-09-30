import { Comment } from "../shared/comment.model";

export class Post {
  public tags: Array<string>;
  public _id: string;
  public title: string;
  public body: string;
  public author: string;
  public comments: Comment[];
  public createdAt: any;
  public updatedAt: any;

constructor( 
  tags: Array<string>, 
_id: string,
title: string, 
body: string, 
author: string, 
comments: Comment[], 
createdAt: any, 
updatedAt: any,) {
  this.tags = tags;
  this._id = _id;
  this.body = body;
  this.author = author;
  this.comments = comments;
  this.createdAt = createdAt;
  this.title = title;
  this.updatedAt = updatedAt;
}
}