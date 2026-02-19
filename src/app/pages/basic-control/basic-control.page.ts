import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-basic-control-page',
  imports: [ReactiveFormsModule, ControlStateDisplay],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-control.page.html',
  styleUrl: './basic-control.page.css',
})
export class BasicControlPage {
  readonly nameControl = new FormControl('');
  readonly bioControl = new FormControl('', { updateOn: "blur" });
  readonly cityControl = new FormControl('');
  readonly cities = ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'];

  readonly agreeControl = new FormControl(false,  { nonNullable: true  });
  readonly nonNullableControl = new FormControl("", { nonNullable: true  });
}
