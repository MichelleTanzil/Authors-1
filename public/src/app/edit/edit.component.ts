import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  author : any;
  status : string;
  id : number;

  constructor(
    private _httpService : HttpService,
    private _route : ActivatedRoute,
    private _router : Router) { }

  ngOnInit() {
    this.author = {name: '', quotes: []};
    this.status = "";
    this._route.params.subscribe((params:Params) => {
      this.id = params['id'];
      this.author = this.getAuthor(this.id);
    })
  }

  editAut(){
    let obs = this._httpService.upAuthor(this.author._id, this.author);
    console.log(this.author);
    obs.subscribe(data=>{
      if(data['message']=="ERROR"){
        this.status = data['data']._message;
      }else{
        this.goHome();
      }
    })
  }

  goHome(){
    this._router.navigate(["../authors"]);
  }

  getAuthor(id){
    this.author = [];
    let obs = this._httpService.getAuthor(id);
    obs.subscribe(data=>{
      this.author = data['data'];
    })
    return this.author;
  }

}
