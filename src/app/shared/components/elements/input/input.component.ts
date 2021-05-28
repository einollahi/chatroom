import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field [appearance]="appearance">
      <mat-label
        *ngIf="label"
        [ngStyle]="{ padding: icon ? '0 2rem 0 0 ' : '0' }"
        >{{ label }}</mat-label
      >
      <div style="display: flex; align-items: center;">
        <input
          matInput
          [formControl]="control"
          autocomplete="off"
          [required]="required"
          [placeholder]="placeholder"
          [matTooltip]="tooltip"
          [matTooltipPosition]="tooltipPosition"
          [matTooltipHideDelay]="tooltipHideDelay || 200"
          [matTooltipShowDelay]="tooltipShowDelay || 200"
          [minlength]="counter ? counter : null"
          [maxlength]="counter ? counter : null"
        />
        <mat-icon *ngIf="icon" matPrefix style="order: -1;">{{
          icon
        }}</mat-icon>
      </div>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
      <mat-hint *ngIf="counter" align="end">{{
        counter + ' / ' + (control.value ? control.value.length : 0)
      }}</mat-hint>
      <mat-error
        *ngIf="control?.invalid"
        style="display: flex; justify-content: space-between;"
      >
        {{ getErrorMessage() }}
        <mat-hint *ngIf="counter">{{
          counter + ' / ' + (control.value ? control.value.length : 0)
        }}</mat-hint>
      </mat-error>
    </mat-form-field>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true },
  ],
})
export class InputComponent extends BaseFormField {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() maxlength: number;
  @Input() counter: number;

  constructor(public injector: Injector) {
    super(injector);
  }
}
