import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newAutor;
  status : string;

  constructor(
    private _httpService : HttpService,
    private _router : Router) { }

  ngOnInit() {
    this.newAutor = {name: ""};
    this.status = "";
  }

  newAut(){
    console.log(this.newAutor);
    let obs = this._httpService.addAuthor(this.newAutor);
    obs.subscribe( data => {
      if(data['message']=="ERROR"){
        console.log(data["data"]._message);
        this.status = data["data"]._message
      }else{
        this.newAutor = {name: ""};
        this.status = "";
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(["../authors"]);
  }
}
