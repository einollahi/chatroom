import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export enum DisplayMode {
  mini = 'mini',
  mobile = 'mobile',
  tablet = 'tablet',
  pc = 'pc',
}

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private displayMode: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  private showProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public readonly DIRECTION = 'rtl';

  constructor() {}

  getShowProgress(): Observable<boolean> {
    return this.showProgress.asObservable();
  }

  setShowProgress(value: boolean): void {
    this.showProgress.next(value);
  }

  getDisplayMode(): Observable<string> {
    return this.displayMode.asObservable();
  }

  setDisplayMode(value: number): void {
    let displayMode;
    if (+value <= 420) displayMode = DisplayMode.mini;
    else if (+value <= 600) displayMode = DisplayMode.mobile;
    else if (value <= 800) displayMode = DisplayMode.tablet;
    else displayMode = DisplayMode.pc;

    this.displayMode.next(displayMode);
  }
}
