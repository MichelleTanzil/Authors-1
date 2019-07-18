import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors = [];
  author = {};
  id = "";
  newAuthor :any;
  editAuthor = {};

  constructor(private _httpService : HttpService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(){
    let obs = this._httpService.getAuthors();
    obs.subscribe( data => {
      console.log(data);
      this.authors = data['data'];
    })
  }

  onDelete(Aid){
    let obs = this._httpService.deleteAuthor(Aid);
    obs.subscribe ( data => {
    })
    this.getAuthors();
  }

}
