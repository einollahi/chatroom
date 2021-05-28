import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-textarea',
  template: `
    <mat-form-field [appearance]="appearance">
      <mat-label
        *ngIf="label"
        [ngStyle]="{ padding: icon ? '0 0 0 1.5rem' : '0' }"
        >{{ label }}</mat-label
      >
      <div style="display: flex; align-items: center;">
        <textarea
          matInput
          [formControl]="control"
          autocomplete="off"
          [required]="required"
          [placeholder]="placeholder"
          [rows]="rows"
          [matTooltip]="tooltip"
          [matTooltipPosition]="tooltipPosition"
          [matTooltipHideDelay]="tooltipHideDelay || 200"
          [matTooltipShowDelay]="tooltipShowDelay || 200"
          [minlength]="counter ? counter : null"
          [maxlength]="
            counter ? counter : null || maxcounter ? maxcounter : null
          "
          style="resize: none;"
        >
        </textarea>
        <mat-icon *ngIf="icon" matPrefix style="order: -1;">{{
          icon
        }}</mat-icon>
      </div>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
      <mat-hint *ngIf="counter" align="end">{{
        counter + ' / ' + (control.value ? control.value.length : 0)
      }}</mat-hint>
      <mat-hint *ngIf="maxcounter" align="end">{{
        maxcounter + ' / ' + (control.value ? control.value.length : 0)
      }}</mat-hint>
      <mat-error
        *ngIf="control?.invalid"
        style="display: flex; justify-content: space-between;"
      >
        {{ getErrorMessage() }}
        <mat-hint *ngIf="counter">{{
          counter + ' / ' + (control.value ? control.value.length : 0)
        }}</mat-hint>
        <mat-hint *ngIf="maxcounter">{{
          maxcounter + ' / ' + (control.value ? control.value.length : 0)
        }}</mat-hint>
      </mat-error>
    </mat-form-field>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextareaComponent, multi: true },
  ],
})
export class TextareaComponent extends BaseFormField {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() placeholder: string;
  @Input() rows: number | string;
  @Input() hint: string;
  @Input() maxlength: number | string;
  @Input() counter: number;
  @Input() maxcounter: number;

  constructor(public injector: Injector) {
    super(injector);
  }
}
