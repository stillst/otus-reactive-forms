import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly sidenav = viewChild.required(MatSidenav);

  protected readonly navLinks = signal([
    { path: '/basic', label: 'Basic Control', icon: 'tune' },
    { path: '/validators', label: 'Validators', icon: 'verified' },
    { path: '/observing', label: 'Observing Changes', icon: 'visibility' },
    { path: '/methods', label: 'Control Methods', icon: 'build' },
    { path: '/material', label: 'Material Controls', icon: 'widgets' },
    { path: '/async-validators', label: 'Async Validators', icon: 'hourglass_top' },
  ]);
}
