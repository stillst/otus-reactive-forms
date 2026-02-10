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
  templateUrl: './observing-changes.page.html',
  styleUrl: './observing-changes.page.css',
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
