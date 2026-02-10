import { Component, input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-control-state-display',
  imports: [JsonPipe, MatCardModule],
  templateUrl: './control-state-display.html',
  styleUrl: './control-state-display.css',
})
export class ControlStateDisplay {
  readonly control = input.required<FormControl | AbstractControl>();
  readonly label = input('Control State');
}
