import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { fwcAPIInterceptor } from './fwcAPIInterceptor';
 


@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: fwcAPIInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

