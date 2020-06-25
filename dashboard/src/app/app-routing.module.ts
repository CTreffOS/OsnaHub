import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './pages/playground/playground.component';


const routes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  { path: '',
    redirectTo: '/playground',
    pathMatch: 'full'
  },
  { path: '**', component: PlaygroundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
