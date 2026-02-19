import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRating),
      multi: true,
    },
  ],
  host: {
    '[class.disabled]': 'disabled()',
  },
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRating implements ControlValueAccessor {
  readonly stars = [1, 2, 3, 4, 5];
  readonly value = signal(0);
  readonly disabled = signal(false);

  /** Callback вызывается при изменении значения — регистрируется формой через registerOnChange */
  private onChange: (value: number) => void = () => {};
  /** Callback вызывается при потере фокуса (touched) — регистрируется формой через registerOnTouched */
  private onTouched: () => void = () => {};

  select(star: number): void {
    this.value.set(star);
    this.onChange(star);
    this.onTouched();
  }

  /** Вызывается формой для передачи значения в компонент (например, при setValue/patchValue/reset) */
  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  /** Форма передаёт callback, который компонент должен вызывать при изменении значения */
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  /** Форма передаёт callback, который компонент должен вызывать при взаимодействии пользователя (touched) */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Вызывается формой при enable()/disable() — компонент должен отразить disabled-состояние в UI */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
