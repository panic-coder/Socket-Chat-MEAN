import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationComponent } from './component/registration/registration.component';
import { ChatDashboardComponent } from './component/chat-dashboard/chat-dashboard.component';
import { AppMaterialModule } from './app-material.module';
import { AppService } from './services/app.service';
import { ChatService } from './services/chat.service';
import { HomeComponent } from './component/home/home.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ChatDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
   JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['localhost:3001'],
      blacklistedRoutes: ['localhost:3001/auth/']
    }
  })
  ],
  
  providers: [AppService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
