import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { BinComponent } from "./views/bin/bin.component";
import { LoginComponent } from "./views/login/login.component";
import { CapabilityComponent } from "./views/capability/capability.component";

import { AuthGuard } from "./auth.guard";
import { DeletedComponent } from "./views/deleted/deleted.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'capabilities/:id',
    pathMatch: 'full',
    component: CapabilityComponent
  },
  {
    path: 'deleted',
    pathMatch: 'full',
    component: BinComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
