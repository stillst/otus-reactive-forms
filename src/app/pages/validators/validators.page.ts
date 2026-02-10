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
  templateUrl: './validators.page.html',
  styleUrl: './validators.page.css',
})
export class ValidatorsPage {
  readonly requiredControl = new FormControl('', Validators.required);
  readonly emailControl = new FormControl('', Validators.email);
  readonly minLengthControl = new FormControl('', Validators.minLength(3));
  readonly patternControl = new FormControl('', Validators.pattern(/^\d+$/));
  readonly customControl = new FormControl('', forbiddenWordValidator('admin'));
}
