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
  styles: `
    :host {
      display: inline-flex;
      gap: 4px;
    }

    .star {
      font-size: 32px;
      cursor: pointer;
      color: #ccc;
      transition: color 0.15s, transform 0.15s;
      user-select: none;
      background: none;
      border: none;
      padding: 0;
      line-height: 1;
      font-family: inherit;
    }

    .star:hover:not(:disabled) {
      transform: scale(1.2);
    }

    .star.filled {
      color: #f5a623;
    }

    .star:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host.disabled {
      opacity: 0.6;
    }
  `,
  template: `
    @for (star of stars; track star) {
      <button
        type="button"
        class="star"
        [class.filled]="star <= value()"
        [disabled]="disabled()"
        (click)="select(star)"
      >
        {{ star <= value() ? '★' : '☆' }}
      </button>
    }
  `,
})
export class StarRating implements ControlValueAccessor {
  readonly stars = [1, 2, 3, 4, 5];
  readonly value = signal(0);
  readonly disabled = signal(false);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  select(star: number): void {
    this.value.set(star);
    this.onChange(star);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
