import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RegisterContainerComponent } from './components/features/register/container/register-container.component';
import { LoginContainerComponent } from './components/features/login/container/login-container.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeContainerComponent } from './components/features/home/container/home-container.component';


const routes: Routes = [
  { path: 'welcome', component: LandingComponent },
  { path: 'login', component: LoginContainerComponent },
  { path: 'register', component: RegisterContainerComponent },
  { path: 'home', component: HomeContainerComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'pagenotfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
