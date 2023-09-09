import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CanDeactivateFn } from "@angular/router";
import { FormControlComponent } from "src/app/forms/reactive-form/form-control/form-control.component";

// @Injectable({
//   providedIn: 'root',
// })
// export class FormControlGuard implements CanDeactivateFn<FormControlGuard> {
//   canDeactivate(
//     component: FormControlComponent
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     if (component.customerForm.dirty) {
//       const formName =
//         component.customerForm.get('firstName')?.value || 'New Form';
//       return confirm(`Navigate away and lose all changes to ${formName}?`);
//     }
//     return true;
//   }
// }
