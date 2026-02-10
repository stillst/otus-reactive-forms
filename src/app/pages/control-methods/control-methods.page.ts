import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ControlStateDisplay } from '../../shared/control-state-display';

@Component({
  selector: 'app-control-methods-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    ControlStateDisplay,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './control-methods.page.html',
  styleUrl: './control-methods.page.css',
})
export class ControlMethodsPage {
  readonly control = new FormControl('');

  addRequired(): void {
    this.control.setValidators(Validators.required);
    this.control.updateValueAndValidity();
  }

  removeValidators(): void {
    this.control.clearValidators();
    this.control.updateValueAndValidity();
  }
}
