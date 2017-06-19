import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import {PlaygroundRoutingModule} from './playground-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ],
  declarations: [OneComponent, TwoComponent, ThreeComponent]
})
export class PlaygroundModule { }
