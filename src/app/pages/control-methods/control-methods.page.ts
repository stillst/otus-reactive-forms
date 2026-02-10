import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-control-methods-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
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

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
  `,
  template: `
    <h1>Control Methods</h1>

    <section class="demo-section">
      <div class="demo-row">
        <div>
          <mat-form-field>
            <mat-label>Demo field</mat-label>
            <input matInput [formControl]="control" />
            @if (control.hasError('required')) {
              <mat-error>Required</mat-error>
            }
          </mat-form-field>
        </div>
        <app-control-state-display [control]="control" label="control" />
      </div>
    </section>

    <mat-divider />

    <section class="demo-section">
      <h2>setValue / reset</h2>
      <div class="button-group">
        <button mat-flat-button (click)="control.setValue('Hello!')">
          setValue('Hello!')
        </button>
        <button mat-flat-button (click)="control.reset()">
          reset()
        </button>
        <button mat-flat-button (click)="control.reset('initial')">
          reset('initial')
        </button>
      </div>
    </section>

    <mat-divider />

    <section class="demo-section">
      <h2>enable / disable</h2>
      <div class="button-group">
        <button mat-flat-button (click)="control.disable()">disable()</button>
        <button mat-flat-button (click)="control.enable()">enable()</button>
      </div>
    </section>

    <mat-divider />

    <section class="demo-section">
      <h2>markAsDirty / markAsPristine / markAsTouched / markAsUntouched</h2>
      <div class="button-group">
        <button mat-stroked-button (click)="control.markAsDirty()">markAsDirty()</button>
        <button mat-stroked-button (click)="control.markAsPristine()">markAsPristine()</button>
        <button mat-stroked-button (click)="control.markAsTouched()">markAsTouched()</button>
        <button mat-stroked-button (click)="control.markAsUntouched()">markAsUntouched()</button>
      </div>
    </section>

    <mat-divider />

    <section class="demo-section">
      <h2>setValidators / clearValidators</h2>
      <div class="button-group">
        <button mat-stroked-button (click)="addRequired()">
          setValidators(Validators.required)
        </button>
        <button mat-stroked-button (click)="removeValidators()">
          clearValidators()
        </button>
      </div>
    </section>
  `,
})
export class ControlMethodsPage {
  readonly control = new FormControl('');

  addRequired(): void {
    this.control.setValidators(Validators.required);
    this.control.updateValueAndValidity();
  }

  removeValidators(): void {
    this.control.clearValidators();
    this.control.updateValueAndValidity();
  }
}
