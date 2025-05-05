import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task.list.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../../business/dashboard/dashboard.component')
      },
      {
        path: 'profile',
        loadComponent: () => import('../../business/profile/profile.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('../../business/tables/tables.component')
      },
      // {
      //   path: 'factura',
      //   loadComponent: () => import('../../business/factura/factura.component')
      // },
      {
        path: 'list-factura',
        loadComponent: () => import('../../business/list-factura/list-factura.component')
      },
       {
        path: '',
        redirectTo: 'dashboard',  // Redirige a dashboard solo cuando se accede a la ruta vacía
        pathMatch: 'full'
      }
    ]
  }
] as Routes;
