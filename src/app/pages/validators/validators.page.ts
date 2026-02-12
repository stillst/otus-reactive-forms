import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';
import {JsonPipe} from '@angular/common';

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
  imports: [ReactiveFormsModule, ControlStateDisplay, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './validators.page.html',
  styleUrl: './validators.page.css',
})
export class ValidatorsPage {
  readonly requiredControl = new FormControl('', { nonNullable: true, validators: Validators.required });
  readonly emailControl = new FormControl('', Validators.email);
  readonly minLengthControl = new FormControl('', Validators.minLength(3));
  readonly patternControl = new FormControl('', Validators.pattern(/^\d+$/));
  readonly customControl = new FormControl('', forbiddenWordValidator('admin'));
}
