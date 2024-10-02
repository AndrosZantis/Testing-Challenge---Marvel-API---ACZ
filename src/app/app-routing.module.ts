import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

const routes: Routes = [
  {path:'', component: CharacterListComponent},
  {path:'character/:id', component: CharacterDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
