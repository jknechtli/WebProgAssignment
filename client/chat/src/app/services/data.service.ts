import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface IPost {
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "";
  posts: IPost;

  constructor(private http: HttpClient) { }

  getNewData() {
    this.http.get<IPost>(this.url).subscribe(res => {
      this.posts = res;
    })
  }

  postData() {
    this.http.post<IPost>(this.url, this.posts.body).subscribe(
      res => console.log(res),
      (err: HttpErrorResponse) => console.log(err.error)
    );
  }
}
