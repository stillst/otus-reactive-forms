import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-form-submit-page',
  imports: [ReactiveFormsModule, JsonPipe, ControlStateDisplay],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-submit.page.html',
  styleUrl: './form-submit.page.css',
})
export class FormSubmitPage {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  readonly submitting = signal(false);
  readonly submittedData = signal<Record<string, unknown> | null>(null);

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
