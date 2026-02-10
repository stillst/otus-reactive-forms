import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-basic-control-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
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
  `,
  template: `
    <h1>Basic FormControl</h1>

    <section class="demo-section">
      <h2>Text Input</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput [formControl]="nameControl" />
        </mat-form-field>
        <app-control-state-display [control]="nameControl" label="name" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Textarea</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Bio</mat-label>
          <textarea matInput [formControl]="bioControl" rows="3"></textarea>
        </mat-form-field>
        <app-control-state-display [control]="bioControl" label="bio" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Select</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>City</mat-label>
          <mat-select [formControl]="cityControl">
            @for (city of cities; track city) {
              <mat-option [value]="city">{{ city }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <app-control-state-display [control]="cityControl" label="city" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Checkbox</h2>
      <div class="demo-row">
        <mat-checkbox [formControl]="agreeControl">I agree to terms</mat-checkbox>
        <app-control-state-display [control]="agreeControl" label="agree" />
      </div>
    </section>

    <section class="demo-section">
      <h2>nonNullable FormControl</h2>
      <p>This control resets to its initial value (<code>"default"</code>) instead of <code>null</code>.</p>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Non-nullable field</mat-label>
          <input matInput [formControl]="nonNullableControl" />
        </mat-form-field>
        <app-control-state-display [control]="nonNullableControl" label="nonNullable" />
      </div>
      <p>Try clearing the field and calling <code>reset()</code> — value will be <code>"default"</code>.</p>
    </section>
  `,
})
export class BasicControlPage {
  readonly nameControl = new FormControl('');
  readonly bioControl = new FormControl('');
  readonly cityControl = new FormControl('');
  readonly agreeControl = new FormControl(false);
  readonly nonNullableControl = new FormControl('default', { nonNullable: true });

  readonly cities = ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'];
}
