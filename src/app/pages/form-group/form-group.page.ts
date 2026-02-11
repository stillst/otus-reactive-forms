import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';

interface PasswordControls {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const group = control as FormGroup<PasswordControls>;
  const password = group.controls.password.value;
  const confirm = group.controls.confirmPassword.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-form-group-page',
  imports: [ReactiveFormsModule, JsonPipe, ControlStateDisplay],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-group.page.html',
  styleUrl: './form-group.page.css',
})
export class FormGroupPage {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    }),
    passwords: new FormGroup<PasswordControls>(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      { validators: passwordMatchValidator }
    ),
  });

  readonly submitting = signal(false);
  readonly submittedData = signal<Record<string, unknown> | null>(null);

  setAll(): void {
    this.form.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      address: { street: '123 Main St', city: 'Springfield' },
      passwords: { password: 'secret', confirmPassword: 'secret' },
    });
  }

  patchPartial(): void {
    this.form.patchValue({
      name: 'Jane Doe',
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    this.submittedData.set(null);

    setTimeout(() => {
      this.submittedData.set(this.form.getRawValue());
      this.form.reset();
      this.submitting.set(false);
    }, 1500);
  }
}
