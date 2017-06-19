import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';

const routes: Routes = [{
  path: '',
  component: PlaygroundComponent,
  children:[{
    path:'one',
    component:OneComponent
  },{
    path:'two',
    component:TwoComponent
  }]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
