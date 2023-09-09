import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Customer } from '../../template-driven-form/customer';

@Component({
  selector: 'app-reactive-formcontrol',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  customerForm!: FormGroup;
  customer = new Customer();

  constructor() {}
  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    });
  }

  populateTestDataSet() {
    console.log('set value using setValue');
    this.customerForm.setValue({
      firstName: 'first test',
      lastName: 'last test',
      email: 'test@example.com',
      sendCatalog: false,
    });
  }

  populateTestDataPatch() {
    console.log('set value using patchValue');
    this.customerForm.patchValue({
      firstName: 'first test',
      lastName: 'last test',
      sendCatalog: false,
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
