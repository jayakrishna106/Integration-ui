import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../message-controller/message-controller.component';
import { WorkflowManagerComponent } from '../../workflow-manager/workflow-manager.component';
import { RoutesComponent } from '../../routes/routes.component';
import { MapperComponent } from '../../mapper/mapper.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'mapper',
    //         component: Component
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'workflow-manager',
    //         component: WorkflowManagerComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'message-controller',     component: TableListComponent },
    { path: 'workflow-manager',     component: WorkflowManagerComponent },
    { path: 'routes',          component: RoutesComponent },
    { path: 'mapper',           component: MapperComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
