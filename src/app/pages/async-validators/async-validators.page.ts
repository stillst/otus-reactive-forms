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
  templateUrl: './async-validators.page.html',
  styleUrl: './async-validators.page.css',
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
