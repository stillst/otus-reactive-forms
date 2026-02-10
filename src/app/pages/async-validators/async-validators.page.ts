import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ControlStateDisplay } from '../../shared/control-state-display';
import { UsernameCheckService } from './username-check.service';

@Component({
  selector: 'app-async-validators-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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

    .spinner-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }

    .taken-list {
      margin-top: 16px;
      color: rgba(0, 0, 0, 0.6);
    }

    .taken-list code {
      background: rgba(0, 0, 0, 0.06);
      padding: 2px 6px;
      border-radius: 4px;
    }
  `,
  template: `
    <h1>Async Validators</h1>

    <section class="demo-section">
      <h2>Username availability check</h2>
      <p>
        An async validator simulates a server call (1.5s delay) to check if the username is taken.
        Watch the control status transition: VALID/INVALID → PENDING → VALID/INVALID.
      </p>

      <div class="demo-row">
        <div>
          <mat-form-field>
            <mat-label>Username</mat-label>
            <input matInput [formControl]="usernameControl" />
            @if (usernameControl.hasError('required')) {
              <mat-error>Username is required</mat-error>
            }
            @if (usernameControl.hasError('minlength')) {
              <mat-error>Minimum 3 characters</mat-error>
            }
            @if (usernameControl.hasError('usernameTaken')) {
              <mat-error>This username is already taken</mat-error>
            }
          </mat-form-field>

          @if (usernameControl.status === 'PENDING') {
            <div class="spinner-row">
              <mat-spinner diameter="20" />
              <span>Checking availability...</span>
            </div>
          }

          <div class="taken-list">
            <p>Try these taken usernames:</p>
            <p>
              <code>admin</code> <code>root</code> <code>test</code>
              <code>user</code> <code>moderator</code>
            </p>
          </div>
        </div>
        <app-control-state-display [control]="usernameControl" label="username" />
      </div>
    </section>
  `,
})
export class AsyncValidatorsPage {
  private readonly usernameCheckService = inject(UsernameCheckService);

  readonly usernameControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [
      (control: AbstractControl) =>
        this.usernameCheckService
          .checkUsername(control.value)
          .pipe(map((taken) => (taken ? { usernameTaken: true } : null))),
    ],
    updateOn: 'blur',
  });
}
