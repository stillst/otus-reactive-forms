import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-material-controls-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDatepickerModule,
    MatRadioModule,
    ControlStateDisplay,
  ],
  providers: [provideNativeDateAdapter()],
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
  `,
  template: `
    <h1>Material Controls</h1>

    <section class="demo-section">
      <h2>mat-input</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Full name</mat-label>
          <input matInput [formControl]="nameControl" />
        </mat-form-field>
        <app-control-state-display [control]="nameControl" label="name" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-select</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Favorite color</mat-label>
          <mat-select [formControl]="colorControl">
            @for (color of colors; track color) {
              <mat-option [value]="color">{{ color }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <app-control-state-display [control]="colorControl" label="color" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-checkbox</h2>
      <div class="demo-row">
        <mat-checkbox [formControl]="newsletterControl">Subscribe to newsletter</mat-checkbox>
        <app-control-state-display [control]="newsletterControl" label="newsletter" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-slide-toggle</h2>
      <div class="demo-row">
        <mat-slide-toggle [formControl]="darkModeControl">Dark mode</mat-slide-toggle>
        <app-control-state-display [control]="darkModeControl" label="darkMode" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-slider</h2>
      <div class="demo-row">
        <mat-slider min="0" max="100" step="1" showTickMarks discrete>
          <input matSliderThumb [formControl]="volumeControl" />
        </mat-slider>
        <app-control-state-display [control]="volumeControl" label="volume" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-datepicker</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Date of birth</mat-label>
          <input matInput [matDatepicker]="picker" [formControl]="dateControl" />
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>
        <app-control-state-display [control]="dateControl" label="date" />
      </div>
    </section>

    <section class="demo-section">
      <h2>mat-radio-group</h2>
      <div class="demo-row">
        <mat-radio-group [formControl]="genderControl">
          @for (option of genders; track option) {
            <mat-radio-button [value]="option">{{ option }}</mat-radio-button>
          }
        </mat-radio-group>
        <app-control-state-display [control]="genderControl" label="gender" />
      </div>
    </section>
  `,
})
export class MaterialControlsPage {
  readonly nameControl = new FormControl('');
  readonly colorControl = new FormControl('');
  readonly newsletterControl = new FormControl(false);
  readonly darkModeControl = new FormControl(false);
  readonly volumeControl = new FormControl(50);
  readonly dateControl = new FormControl<Date | null>(null);
  readonly genderControl = new FormControl('');

  readonly colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
  readonly genders = ['Male', 'Female', 'Other'];
}
