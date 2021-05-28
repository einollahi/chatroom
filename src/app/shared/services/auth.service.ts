import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getAuthState(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  setAuthState(value: boolean): void {
    this.isLogin.next(value);
  }
}
