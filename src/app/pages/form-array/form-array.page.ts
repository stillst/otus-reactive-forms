import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';

function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;
    return array.length >= min ? null : { minArrayLength: { min, actual: array.length } };
  };
}

@Component({
  selector: 'app-form-array-page',
  imports: [ReactiveFormsModule, JsonPipe, ControlStateDisplay],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-array.page.html',
  styleUrl: './form-array.page.css',
})
export class FormArrayPage {
  readonly form = new FormGroup({
    phones: new FormArray<FormControl<string>>(
      [new FormControl('', { nonNullable: true })],
      minArrayLength(1)
    ),
    skills: new FormArray([
      new FormGroup({
        name: new FormControl('', { nonNullable: true, validators: Validators.required }),
        level: new FormControl('beginner', { nonNullable: true }),
      }),
    ]),
  });

  readonly submitting = signal(false);
  readonly submittedData = signal<Record<string, unknown> | null>(null);

  constructor() {
    this.form.valueChanges.subscribe(x => console.log("form value", x))
  }

  get phones(): FormArray<FormControl<string>> {
    return this.form.controls.phones;
  }

  get skills(): FormArray {
    return this.form.controls.skills;
  }

  addPhone(): void {
    this.phones.push(new FormControl('', { nonNullable: true }));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  addSkill(): void {
    this.skills.push(
      new FormGroup({
        name: new FormControl('', { nonNullable: true, validators: Validators.required }),
        level: new FormControl('beginner', { nonNullable: true }),
      })
    );
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Section 4 methods
  pushItem(): void {
    this.phones.push(new FormControl('new', { nonNullable: true }));
  }

  removeFirst(): void {
    if (this.phones.length > 0) {
      this.phones.removeAt(0);
    }
  }

  updateFirst(): void {
    if (this.phones.length > 0) {
      this.phones.at(0).setValue('updated');
    }
  }

  clearPhones(): void {
    this.phones.clear();
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
