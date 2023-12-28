import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "@core/interceptors/auth.interceptor";
import {errorInterceptor} from "@core/guard/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
