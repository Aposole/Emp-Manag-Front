import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import the routing module

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Adjust path
import { RegisterComponent } from './register/register.component'; // Adjust path
import { AuthGuard } from './AuthGuard'; // Adjust path

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule // Add the routing module here
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
