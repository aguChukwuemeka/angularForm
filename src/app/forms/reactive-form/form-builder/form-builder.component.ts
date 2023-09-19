import { FormAppService } from './../../../core/service/formApp.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EMPTY, catchError, debounceTime, of } from 'rxjs';
import { __values } from 'tslib';

function ratingRange(C: AbstractControl): { [key: string]: boolean } | null {
  if (C.value !== null && (isNaN(C.value) || C.value < 1 || C.value > 5)) {
    return { range: true };
  }
  return null;
}

// Cross-field validation
function emailMatcher(C: AbstractControl): { [key: string]: boolean } | null {
  let emailControl = C.get('email');
  let confirmControl = C.get('confirmEmail');

  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value !== confirmControl?.value) {
    return { match: true };
  }
  return null;
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  customerForm!: FormGroup;
  emailMessage!: string;

  states = ['Enugu', 'Imo', 'Anambra', 'Abia', 'Ebonyi'];

  private validationMessages: any = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(
    private fb: FormBuilder,
    private formAppService: FormAppService
  ) {}

  addAddress(): void {
    return this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  // Testing Observable with out calling function...
  requests$ = this.formAppService.requests$.pipe(
    catchError((err) => {
      console.log(err);
      return of([]); // OR
      // return EMPTY;
    })
  ); // then on the Template use async pipe:(they're more Declarative Approach & reactive syntax )

  ngOnInit() {
    this.customerForm = this.fb.group({
      // firstName: [{value: 'n/a', disabled: true },Validators],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      // Nested form group (Cross filed validation)
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', Validators.required],
        },
        { validator: emailMatcher }
      ),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()]),
    });

    this.customerForm.get('notification')?.valueChanges.subscribe((value) => {
      this.setNotification(value);
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(debounceTime(1000)).subscribe(
      (value) => this.setMessages(emailControl)
      // console.log(value + ' = > ' + emailControl)
    );
  }

  setMessages(c: AbstractControl): void {
    this.emailMessage = '';
    // console.log('Object : ' + Object.keys(c));
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map((key) => (this.emailMessage += this.validationMessages[key]))
        .join('');
    }
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
