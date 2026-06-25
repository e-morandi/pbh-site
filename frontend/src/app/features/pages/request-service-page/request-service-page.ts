import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CheckNumber } from '../../services/validation-form';
import { RequestServiceService } from '../../services/request-service.service';

@Component({
  selector: 'app-request-service-page',
  imports: [ReactiveFormsModule],
  templateUrl: './request-service-page.html',
  styleUrl: './request-service-page.css',
})
export class RequestServicePage {
  // Status for request sending
  submitStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';

  // Form control for sending service request
  name = new FormControl('', [
    Validators.required
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  address = new FormControl('', []);
  phone = new FormControl('', [
    Validators.required,
    CheckNumber(),
  ]);
  body = new FormControl('', [
    Validators.required,
    Validators.maxLength(10000),
  ]);

  form = new FormGroup({
    name: this.name,
    email: this.email,
    address: this.address,
    phone: this.phone,
    body: this.body,
  });

  constructor(private requestService: RequestServiceService) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.submitStatus = 'loading';
 
    this.requestService.submit({
      name: this.name.value!,
      email: this.email.value!,
      phone: this.phone.value!,
      address: this.address.value ?? '',
      body: this.body.value!,
    }).subscribe({
      next: () => {
        this.submitStatus = 'success';
        this.form.reset();
      },
      error: (err) => {
        this.submitStatus = 'error';
        this.errorMessage = err.error?.message ?? 'Something went wrong. Please try again.';
      },
    });
  }
}
