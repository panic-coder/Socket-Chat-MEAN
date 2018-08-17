import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ChatDashboardComponent } from './component/chat-dashboard/chat-dashboard.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes : Routes = [
 { path: '', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
 { path: 'chatdash', component: ChatDashboardComponent, canActivate:[AuthGuard] },
 { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { 

}
