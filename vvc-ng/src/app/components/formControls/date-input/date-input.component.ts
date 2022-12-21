import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ControlContainer, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DateInputComponent
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
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
    this.value = formattedValue
    this.onChanged?.(this.value);
    this.validate();
  }

  private formatValue(original: string | undefined): string {
    if(!original) {
      return ''
    }
    const splitted = original.replace(/\//gm, '.').split('.')
    if (splitted.length < 3) {
      return ''
    }

    const day = Number.parseInt(splitted[0])
    const month = Number.parseInt(splitted[1])
    const year = Number.parseInt(splitted[2])
    
    const date = new Date()
    date.setFullYear(year < 100 ? year + 2000 : year)
    date.setMonth(month - 1)
    date.setDate(day)

    const formattedDate = date.toLocaleDateString('de-DE')
    console.log('formatValue', formattedDate)
    return formattedDate
  }
}
