import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationComponent } from './component/registration/registration.component';
import { ChatDashboardComponent } from './component/chat-dashboard/chat-dashboard.component';
import { AppMaterialModule } from './/app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ChatDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
