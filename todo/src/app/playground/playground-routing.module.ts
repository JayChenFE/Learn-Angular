import { BuildInPiplesComponent } from './build-in-piples/build-in-piples.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { Piple1Component } from './piple1/piple1.component';
import { Piple2Component } from './piple2/piple2.component';
import { DirectiveComponent } from './directive/directive.component';

const routes: Routes = [{
  path: '',
  component: PlaygroundComponent,
  children: [{
    path: 'one',
    component: OneComponent,
    children: [{
      path: 'three',
      component: ThreeComponent
    }]
  }, {
    path: 'two',
    component: TwoComponent
  },
  {
    path: 'piple1',
    component: Piple1Component
  },
  {
    path: 'piple2',
    component: Piple2Component
  },
  {
    path: 'build-in',
    component: BuildInPiplesComponent
  },
  {
    path: 'directive',
    component: DirectiveComponent
  }]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
