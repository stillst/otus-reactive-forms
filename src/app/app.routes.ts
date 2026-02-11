import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  {
    path: 'basic',
    loadComponent: () =>
      import('./pages/basic-control/basic-control.page').then((m) => m.BasicControlPage),
  },
  {
    path: 'validators',
    loadComponent: () =>
      import('./pages/validators/validators.page').then((m) => m.ValidatorsPage),
  },
  {
    path: 'observing',
    loadComponent: () =>
      import('./pages/observing-changes/observing-changes.page').then(
        (m) => m.ObservingChangesPage
      ),
  },
  {
    path: 'methods',
    loadComponent: () =>
      import('./pages/control-methods/control-methods.page').then((m) => m.ControlMethodsPage),
  },
  {
    path: 'material',
    loadComponent: () =>
      import('./pages/material-controls/material-controls.page').then(
        (m) => m.MaterialControlsPage
      ),
  },
  {
    path: 'async-validators',
    loadComponent: () =>
      import('./pages/async-validators/async-validators.page').then(
        (m) => m.AsyncValidatorsPage
      ),
  },
  {
    path: 'form-group',
    loadComponent: () =>
      import('./pages/form-group/form-group.page').then((m) => m.FormGroupPage),
  },
];
