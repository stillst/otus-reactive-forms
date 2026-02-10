import { Component, input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-control-state-display',
  imports: [JsonPipe, MatCardModule],
  styles: `
    :host {
      display: block;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    td {
      padding: 6px 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      vertical-align: top;
    }

    td:first-child {
      font-weight: 500;
      width: 120px;
      color: rgba(0, 0, 0, 0.6);
    }

    .status-valid {
      color: #2e7d32;
    }

    .status-invalid {
      color: #c62828;
    }

    .status-pending {
      color: #ef6c00;
    }
  `,
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ label() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table>
          <tr>
            <td>value</td>
            <td>{{ control().value | json }}</td>
          </tr>
          <tr>
            <td>status</td>
            <td [class]="'status-' + control().status.toLowerCase()">
              {{ control().status }}
            </td>
          </tr>
          <tr>
            <td>valid</td>
            <td>{{ control().valid }}</td>
          </tr>
          <tr>
            <td>dirty</td>
            <td>{{ control().dirty }}</td>
          </tr>
          <tr>
            <td>touched</td>
            <td>{{ control().touched }}</td>
          </tr>
          <tr>
            <td>errors</td>
            <td>{{ control().errors | json }}</td>
          </tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
})
export class ControlStateDisplay {
  readonly control = input.required<FormControl | AbstractControl>();
  readonly label = input('Control State');
}
