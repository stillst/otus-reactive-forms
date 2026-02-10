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
  templateUrl: './material-controls.page.html',
  styleUrl: './material-controls.page.css',
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
