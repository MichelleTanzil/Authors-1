import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  {
    path: "authors",
    component : AuthorsComponent
  },
  {
    path: "author/new",
    component : NewComponent
  },
  {
    path: "author/:id",
    component : EditComponent
  },
  {
    path : "quote/:id",
    component : QuotesComponent
  },
  {
    path: "write/:id",
    component : WriteComponent
  },
  { path: '', 
    pathMatch: 'full',
    redirectTo: 'authors' },
  {
    path: "**",
    component : PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
