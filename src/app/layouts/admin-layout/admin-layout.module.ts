import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../message-controller/message-controller.component';
import { WorkflowManagerComponent } from '../../workflow-manager/workflow-manager.component';
import { RoutesComponent } from '../../routes/routes.component';
import { MapperComponent } from '../../mapper/mapper.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule }  from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {DataMapperModule} from '@atlasmap/atlasmap-data-mapper';
import { DataMapperHostComponent } from "app/mapper/data-mapper-host.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { fwcAPIInterceptor } from 'app/fwcAPIInterceptor';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DataMapperModule,
    
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    WorkflowManagerComponent,
    RoutesComponent,
    MapperComponent,
    NotificationsComponent,
    UpgradeComponent,
    DataMapperHostComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: fwcAPIInterceptor, multi: true},
  ]
})

export class AdminLayoutModule {}
