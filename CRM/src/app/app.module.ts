import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './intercept/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
