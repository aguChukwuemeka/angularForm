import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControlComponent } from './forms/reactive-form/form-control/form-control.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { FormBuilderComponent } from './forms/reactive-form/form-builder/form-builder.component';

const routes: Routes = [
  { path: '', redirectTo: 'template-driven', pathMatch: 'full' },
  { path: 'template-driven', component: TemplateDrivenFormComponent },
  { path: 'form-control', component: FormControlComponent },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: '**', component: TemplateDrivenFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
