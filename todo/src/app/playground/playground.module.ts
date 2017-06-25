import { PlaygroundComponent } from './playground.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { Piple1Component } from './piple1/piple1.component';
import { Piple2Component } from './piple2/piple2.component';
import { TrimPipe } from './customePiple/trim.pipe';
import { BuildInPiplesComponent } from './build-in-piples/build-in-piples.component';
import { DirectiveComponent } from './directive/directive.component';
import { DatePiplePipe } from './date-piple/date-piple.pipe';

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ],

  declarations: [
    PlaygroundComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    Piple1Component,
    Piple2Component,
    TrimPipe,
    BuildInPiplesComponent,
    DirectiveComponent,
    DatePiplePipe
  ]
})
export class PlaygroundModule { }
