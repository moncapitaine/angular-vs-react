import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CurrencyInputComponent
    }
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor  {
  @ViewChild("internalInput", { static: true }) internalInput?: ElementRef<HTMLInputElement>;

  @Input()
  formControl!: FormControl;
  @Input()
  formControlName!: string;

  onChanged?: (value: string) => void;
  onTouched?: () => void;
  value = "";
  disabled = false;

  get control() {
    return this.formControl || this.controlContainer.control?.get(this.formControlName);
  }

  get required(): boolean {
    return !!this.control?.hasValidator(Validators.required);
  }

  constructor(private controlContainer: ControlContainer) {}

  writeValue(value: string): void {
    this.value = this.formatValue(value);
    if (this.internalInput) {
      this.internalInput.nativeElement.value = this.value
    }
    if (this.control.touched) {
      this.validate();
    }
  }

  registerOnChange(fn: () => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  private validate() {
    console.warn('validate not implemented')
  }

  handleBlur() {
    if (this.internalInput) {
      this.internalInput.nativeElement.value = this.value
      this.control.setValue(this.value)
    }
    this.validate();
    this.onTouched?.();
  }

  handleInput(event: Event) {
    const internalValue = (event.target as HTMLInputElement).value;
    const formattedValue = this.formatValue(internalValue)
    console.log('handleInput', internalValue, formattedValue)
    this.value = formattedValue
    this.onChanged?.(this.value);
    this.validate();
  }

  private formatValue(original: string | number | undefined): string {
    const originalValue = typeof original === 'number' ? original.toString() : original
    if(!originalValue) {
      return ''
    }
    const valueAsNumber = Number.parseFloat(originalValue.replace(/\./gm, '').replace(/\,/gm,'.'))
    const targetFormat = new Intl.NumberFormat('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    console.log('formatValue', valueAsNumber)
    return targetFormat.format(valueAsNumber)
  }
}
