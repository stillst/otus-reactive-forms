import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ControlStateDisplay } from '../../shared/control-state-display';

function forbiddenWordValidator(forbidden: string) {
  return (control: AbstractControl) => {
    const value: string = control.value ?? '';
    return value.toLowerCase().includes(forbidden.toLowerCase())
      ? { forbiddenWord: { word: forbidden } }
      : null;
  };
}

@Component({
  selector: 'app-validators-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ControlStateDisplay,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .demo-section {
      margin-bottom: 32px;
    }

    h2 {
      margin-bottom: 16px;
    }

    .demo-row {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    .demo-row > :first-child {
      flex: 1;
    }

    .demo-row > app-control-state-display {
      flex: 1;
    }

    mat-form-field {
      width: 100%;
    }

    mat-error {
      font-size: 12px;
    }
  `,
  template: `
    <h1>Validators</h1>

    <section class="demo-section">
      <h2>Required</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Required field</mat-label>
          <input matInput [formControl]="requiredControl" />
          @if (requiredControl.hasError('required')) {
            <mat-error>This field is required</mat-error>
          }
        </mat-form-field>
        <app-control-state-display [control]="requiredControl" label="required" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Email</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput [formControl]="emailControl" />
          @if (emailControl.hasError('email')) {
            <mat-error>Please enter a valid email</mat-error>
          }
        </mat-form-field>
        <app-control-state-display [control]="emailControl" label="email" />
      </div>
    </section>

    <section class="demo-section">
      <h2>MinLength(3)</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Username (min 3 chars)</mat-label>
          <input matInput [formControl]="minLengthControl" />
          @if (minLengthControl.hasError('minlength')) {
            <mat-error>
              Minimum length is {{ minLengthControl.getError('minlength').requiredLength }},
              current: {{ minLengthControl.getError('minlength').actualLength }}
            </mat-error>
          }
        </mat-form-field>
        <app-control-state-display [control]="minLengthControl" label="minLength" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Pattern (digits only)</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Phone (digits only)</mat-label>
          <input matInput [formControl]="patternControl" />
          @if (patternControl.hasError('pattern')) {
            <mat-error>Only digits are allowed</mat-error>
          }
        </mat-form-field>
        <app-control-state-display [control]="patternControl" label="pattern" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Validator (forbiddenWord: "admin")</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Nickname</mat-label>
          <input matInput [formControl]="customControl" />
          @if (customControl.hasError('forbiddenWord')) {
            <mat-error>
              The word "{{ customControl.getError('forbiddenWord').word }}" is not allowed
            </mat-error>
          }
        </mat-form-field>
        <app-control-state-display [control]="customControl" label="custom" />
      </div>
    </section>
  `,
})
export class ValidatorsPage {
  readonly requiredControl = new FormControl('', Validators.required);
  readonly emailControl = new FormControl('', Validators.email);
  readonly minLengthControl = new FormControl('', Validators.minLength(3));
  readonly patternControl = new FormControl('', Validators.pattern(/^\d+$/));
  readonly customControl = new FormControl('', forbiddenWordValidator('admin'));
}
