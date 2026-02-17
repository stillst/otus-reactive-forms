import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ControlStateDisplay } from '../../shared/control-state-display';
import { StarRating } from './star-rating.component';

@Component({
  selector: 'app-cva-page',
  imports: [ReactiveFormsModule, JsonPipe, ControlStateDisplay, StarRating],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cva.page.html',
  styleUrl: './cva.page.css',
})
export class CvaPage {
  readonly rating = new FormControl(0, { nonNullable: true });

  readonly ratingWithValidation = new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });

  readonly disabledRating = new FormControl({ value: 3, disabled: true }, { nonNullable: true });

  toggleDisabled(): void {
    if (this.disabledRating.disabled) {
      this.disabledRating.enable();
    } else {
      this.disabledRating.disable();
    }
  }

  resetValidation(): void {
    this.ratingWithValidation.reset();
  }
}
