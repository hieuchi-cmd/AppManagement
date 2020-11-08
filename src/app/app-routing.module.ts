import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { AuthGuard } from "./auth/auth.guard";

import { LoginModule } from './login/login.module'

const routes: Routes = [{ path: 'login', loadChildren: () => LoginModule},
                        { path: '', loadChildren: () => LoginModule },
                        { path: 'mainpage', canActivate:[AuthGuard],data:{roles:["admin"]}, component: MainPageComponent},
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
