import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperComponent } from './mapper.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataMapperModule } from '@atlasmap/atlasmap-data-mapper';
import { DataMapperHostComponent } from './data-mapper-host.component';

describe('MapperComponent', () => {
  let component: MapperComponent;
  let fixture: ComponentFixture<MapperComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [MapperComponent, DataMapperHostComponent],
          imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule.forRoot([]),
            DataMapperModule,
          ],
        }).compileComponents();
      }));

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ MapperComponent ]
  //   })
  //   .compileComponents();
  // }));

      it('should create the app', () => {
      const fixture = TestBed.createComponent(MapperComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MapperComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  // describe('AppComponent', () => {
  //   beforeEach(async(() => {
  //     TestBed.configureTestingModule({
  //       declarations: [AppComponent, DataMapperHostComponent],
  //       imports: [
  //         BrowserModule,
  //         FormsModule,
  //         HttpClientModule,
  //         RouterModule.forRoot([]),
  //         DataMapperModule,
  //       ],
  //     }).compileComponents();
  //   }));
  
  //   it('should create the app', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const app = fixture.debugElement.componentInstance;
  //     expect(app).toBeTruthy();
  //   });