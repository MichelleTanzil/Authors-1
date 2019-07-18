import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quote : any;
  author : any;
  vote : any;
  status : string;
  id : string;

  constructor(
    private _httpService : HttpService,
    private _route : ActivatedRoute,
    private _router : Router) { }

  ngOnInit() {
    this.vote = "";
    this.status = "";
    this.author = {name: '', quotes: []};
    this.quote = {quote: '', rank: 5};
    this._route.params.subscribe((param:Params) => {
      this.id = param["id"];
    })
    this.author = this.findQuotes(this.id);
  }

  voteQute(quote_id, rank){
    console.log(quote_id);
    console.log(rank);
    this._route.params.subscribe((param:Params) => {
      let obs = this._httpService.vote(this.id, quote_id, rank);
      obs.subscribe( data => {
        if(data['message']=="ERROR"){
          this.status = data['data']._message;
        }else{
          this.author = data['data'];
        }
      })
    })
  }

  findQuotes(id){
    let obs = this._httpService.getAuthor(id);
    obs.subscribe( data => {
      if(data['message']=="ERROR"){
        this.status = data['data']._message;
      }else{
        this.author = data['data'];
      }
    })
    return this.author;
  }

  goHome(){
    this._router.navigate(["../../authors"]);
  }

}
