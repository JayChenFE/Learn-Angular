import { AuthGuardService } from './core/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RxComponent } from './rx/rx.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    redirectTo: 'todo/all',
    canLoad: [AuthGuardService]
  },
  {
    path: 'playground',
    loadChildren: './playground/playground.module#PlaygroundModule'
  },
  {
    path: 'rx',
    component: RxComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
