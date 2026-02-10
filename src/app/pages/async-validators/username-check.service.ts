import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsernameCheckService {
  private readonly takenUsernames = ['admin', 'root', 'test', 'user', 'moderator'];

  checkUsername(username: string): Observable<boolean> {
    const isTaken = this.takenUsernames.includes(username.toLowerCase().trim());
    return of(isTaken).pipe(delay(1500));
  }
}
