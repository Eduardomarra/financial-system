import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;
  @Input('error-message') messageError: string;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if( this.mostraMensagemErro() ) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mostraMensagemErro(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return this.messageError || 'Campo obrigatório';
    } 
    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    return null;
  }

}
