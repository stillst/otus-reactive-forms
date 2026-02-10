import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ControlStateDisplay } from '../../shared/control-state-display';

interface LogEntry {
  time: string;
  type: 'value' | 'status';
  payload: string;
}

@Component({
  selector: 'app-observing-changes-page',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
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

    .live-values {
      margin-top: 16px;
    }

    .log-container {
      max-height: 300px;
      overflow-y: auto;
      background: #fafafa;
      border-radius: 8px;
      padding: 8px;
    }

    .log-entry {
      font-family: monospace;
      font-size: 13px;
      padding: 4px 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .log-entry .type-value {
      color: #1565c0;
    }

    .log-entry .type-status {
      color: #6a1b9a;
    }

    .log-entry .time {
      color: rgba(0, 0, 0, 0.4);
      margin-right: 8px;
    }
  `,
  template: `
    <h1>Observing Changes</h1>

    <section class="demo-section">
      <h2>valueChanges & statusChanges (async pipe)</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Email (required, email)</mat-label>
          <input matInput [formControl]="emailControl" />
        </mat-form-field>
        <app-control-state-display [control]="emailControl" label="email" />
      </div>

      <div class="live-values">
        <p><strong>valueChanges | async:</strong> {{ emailControl.valueChanges | async }}</p>
        <p><strong>statusChanges | async:</strong> {{ emailControl.statusChanges | async }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>debounceTime + distinctUntilChanged (search simulation)</h2>
      <div class="demo-row">
        <mat-form-field>
          <mat-label>Search query</mat-label>
          <input matInput [formControl]="searchControl" />
          <mat-hint>Debounced (300ms) value appears below</mat-hint>
        </mat-form-field>
        <app-control-state-display [control]="searchControl" label="search" />
      </div>
      <p class="live-values"><strong>Debounced value:</strong> {{ debouncedValue() }}</p>
    </section>

    <section class="demo-section">
      <h2>Change Log</h2>
      <p>All valueChanges and statusChanges from the email field are logged here.</p>
      <button mat-stroked-button (click)="clearLog()">Clear Log</button>
      <div class="log-container">
        @for (entry of log(); track $index) {
          <div class="log-entry">
            <span class="time">{{ entry.time }}</span>
            <span [class]="'type-' + entry.type">[{{ entry.type }}]</span>
            {{ entry.payload }}
          </div>
        }
        @empty {
          <p>No log entries yet. Start typing in the email field above.</p>
        }
      </div>
    </section>
  `,
})
export class ObservingChangesPage implements OnInit {
  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  readonly searchControl = new FormControl('');

  readonly debouncedValue = signal('');
  readonly log = signal<LogEntry[]>([]);

  ngOnInit(): void {
    this.emailControl.valueChanges.subscribe((value) => {
      this.addLog('value', JSON.stringify(value));
    });

    this.emailControl.statusChanges.subscribe((status) => {
      this.addLog('status', status);
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.debouncedValue.set(value ?? '');
      });
  }

  clearLog(): void {
    this.log.set([]);
  }

  private addLog(type: 'value' | 'status', payload: string): void {
    const time = new Date().toLocaleTimeString();
    this.log.update((entries) => [{ time, type, payload }, ...entries]);
  }
}
