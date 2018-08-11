import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ChatDashboardComponent } from './component/chat-dashboard/chat-dashboard.component';

const routes : Routes = [
 { path: '', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
 { path: 'chat-dash', component: ChatDashboardComponent}
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
