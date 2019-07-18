import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  quoteAuthor : any;
  quote : any;
  status : string;
  id : string;

  constructor(
    private _httpService : HttpService,
    private _route : ActivatedRoute,
    private _router : Router) { }

  ngOnInit() {
    this.quoteAuthor = {name: '', quotes: []};
    this.quote = {quote: '', rank: 0};
    this.status="";
    this._route.params.subscribe((param:Params) => {
      this.id = param["id"];
    })
    this.quoteAuthor = this.findAut(this.id);
    console.log(this.quoteAuthor);
  }

  createQuote(){
    let obs = this._httpService.addQuote(this.id, this.quote);
    obs.subscribe(data => {
        if(data['message']=="ERROR"){
        this.status=data['data']._message;
      }else{
        this._router.navigate(["/quote/" + this.id]);
      }
    })
  }

  findAut(id){
    let obs = this._httpService.getAuthor(id);
    obs.subscribe( data => {
      if(data['message']=="ERROR"){
        this.status=data['data']._message;
      }else{
        console.log(data['data']);
        this.quoteAuthor = data['data'];
        return this.quoteAuthor;
      }
    })
  }

  goMain(){
    this._router.navigate(["../authors"]);
  }

}
