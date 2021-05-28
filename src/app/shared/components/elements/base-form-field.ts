import { Component, Injector, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  template: '',
})
export abstract class BaseFormField implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() required: boolean;
  @Input() label: string;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() tooltipPosition: TooltipPosition = 'below';
  @Input() tooltipHideDelay: number;
  @Input() tooltipShowDelay: number;
  @Input() set disabled(value: boolean) {
    value ? this.control.disable() : this.control.enable();
  }

  constructor(public injector: Injector) {}

  get control(): AbstractControl | any {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  private get controlContainer(): ControlContainer {
    return this.injector.get(ControlContainer);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

  getErrorMessage(): void | string {
    if (this.control.hasError('required')) return 'this field is required.';
    if (this.control.hasError('pattern')) return 'the pattern is not correct';
  }
}
