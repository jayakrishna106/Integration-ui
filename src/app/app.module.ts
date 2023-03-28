import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataMapperModule } from '@atlasmap/atlasmap-data-mapper';
import { DataMapperHostComponent } from './mapper/data-mapper-host.component';


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
    DataMapperModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DataMapperHostComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[ DataMapperHostComponent, DataMapperModule]
})

export class AppModule { }

