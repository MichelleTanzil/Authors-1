import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors/');
  }
  getAuthor(id){
    return this._http.get("/author/"+id);
  }
  addAuthor(newAuth){
    return this._http.post("/author/new/", newAuth);
  }
  deleteAuthor(id){
    return this._http.delete("/author/"+id);
  }
  upAuthor(id, upAuth){
    return this._http.put("/author/"+id, upAuth);
  }
  addQuote(id, quote){
    return this._http.put("/quotes/"+id, quote);
  }
  vote(id, quote_id, res){
    return this._http.put("/vote/"+id+"/"+quote_id+"/"+res, res);
  }
}
