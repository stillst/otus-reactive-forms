import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormControl,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-form-record-page',
  imports: [ReactiveFormsModule, JsonPipe, ControlStateDisplay],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-record.page.html',
  styleUrl: './form-record.page.css',
})
export class FormRecordPage {
  // Section 1: Basic FormRecord — dynamic key-value settings
  readonly settings = new FormRecord<FormControl<string>>({
    theme: new FormControl('dark', { nonNullable: true }),
    language: new FormControl('en', { nonNullable: true }),
  });

  readonly newSettingKey = new FormControl('', { nonNullable: true });
  readonly newSettingValue = new FormControl('', { nonNullable: true });

  // Section 2: FormRecord with validators
  readonly permissions = new FormRecord<FormControl<boolean>>({
    read: new FormControl(true, { nonNullable: true }),
    write: new FormControl(false, { nonNullable: true }),
  });

  readonly newPermissionKey = new FormControl('', { nonNullable: true });

  // Section 3: Dynamic form with required fields
  readonly dynamicForm = new FormRecord<FormControl<string>>({});
  readonly newFieldKey = new FormControl('', { nonNullable: true });
  readonly newFieldValue = new FormControl('', { nonNullable: true });

  readonly submitting = signal(false);
  readonly submittedData = signal<Record<string, unknown> | null>(null);

  get settingKeys(): string[] {
    return Object.keys(this.settings.controls);
  }

  get permissionKeys(): string[] {
    return Object.keys(this.permissions.controls);
  }

  get dynamicFieldKeys(): string[] {
    return Object.keys(this.dynamicForm.controls);
  }

  // Section 1 methods
  addSetting(): void {
    const key = this.newSettingKey.value.trim();
    const value = this.newSettingValue.value.trim();
    if (!key || this.settings.contains(key)) return;

    this.settings.addControl(key, new FormControl(value, { nonNullable: true }));
    this.newSettingKey.reset();
    this.newSettingValue.reset();
  }

  removeSetting(key: string): void {
    this.settings.removeControl(key);
  }

  // Section 2 methods
  addPermission(): void {
    const key = this.newPermissionKey.value.trim();
    if (!key || this.permissions.contains(key)) return;

    this.permissions.addControl(key, new FormControl(false, { nonNullable: true }));
    this.newPermissionKey.reset();
  }

  removePermission(key: string): void {
    this.permissions.removeControl(key);
  }

  // Section 3 methods
  addDynamicField(): void {
    const key = this.newFieldKey.value.trim();
    if (!key || this.dynamicForm.contains(key)) return;

    const ctrl = new FormControl('', { nonNullable: true, validators: Validators.required });
    const initialValue = this.newFieldValue.value.trim();
    if (initialValue) {
      ctrl.setValue(initialValue);
    }
    this.dynamicForm.addControl(key, ctrl);
    this.newFieldKey.reset();
    this.newFieldValue.reset();
  }

  removeDynamicField(key: string): void {
    this.dynamicForm.removeControl(key);
  }

  // Section 4 methods
  setControlDemo(): void {
    this.settings.setControl(
      'theme',
      new FormControl('light', { nonNullable: true })
    );
  }

  containsDemo = signal<string | null>(null);

  checkContains(key: string): void {
    this.containsDemo.set(
      `settings.contains('${key}') → ${this.settings.contains(key)}`
    );
  }

  resetSettings(): void {
    this.settings.reset();
  }

  onSubmit(): void {
    if (this.dynamicForm.invalid) return;

    this.submitting.set(true);
    this.submittedData.set(null);

    setTimeout(() => {
      this.submittedData.set(this.dynamicForm.getRawValue());
      this.dynamicForm.reset();
      this.submitting.set(false);
    }, 1500);
  }
}
