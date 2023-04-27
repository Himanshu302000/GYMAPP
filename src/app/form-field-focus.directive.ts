import { Directive, ElementRef, HostListener } from '@angular/core';
import {FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appFormFieldFocus]'
})


export class FormFieldFocusDirective {

  constructor(private form:FormGroupDirective, private elementRef:ElementRef) { }

  @HostListener('ngSubmit')
  onSubmit()
  {
    for (const key of Object.keys(this.form.form.controls)) {
      if (this.form.form.controls[key].invalid) {
        const invalidControl = this.elementRef.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
  }
  }

}
