import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { todoReducer, todoFilterReducer } from '../reducer/todo.reducer';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  imports: [HttpModule,
    StoreModule.provideStore({
      todos: todoReducer,
      todoFilter: todoFilterReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()],
  providers: [
    { provide: 'auth', useClass: AuthService },
    { provide: 'user', useClass: UserService },
    AuthGuardService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
