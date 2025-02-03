import { Routes } from '@angular/router';

export default [
  {
    path: 'upload',
    loadComponent: () =>
      import('./components/fileupload/fileupload.component').then(c => c.FileUploadComponent),
  }
] as Routes;


