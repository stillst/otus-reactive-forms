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
  templateUrl: './basic-control.page.html',
  styleUrl: './basic-control.page.css',
})
export class BasicControlPage {
  readonly nameControl = new FormControl('');
  readonly bioControl = new FormControl('');
  readonly cityControl = new FormControl('');
  readonly agreeControl = new FormControl(false);
  readonly nonNullableControl = new FormControl('default', { nonNullable: true });

  readonly cities = ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'];
}
