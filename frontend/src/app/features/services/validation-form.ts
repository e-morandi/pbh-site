import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function CheckNumber() : ValidatorFn
{   
    return(control: AbstractControl): ValidationErrors | null => 
        {
            // Current value of form control
            const value = control.value;

            // Check with regx expression
            const phone_regx = /^\d{3}-\d{3}-\d{4}$/;
            const is_valid = phone_regx.test(value);

            return is_valid ? null : {invalidNumber: { value: control.value }};
        };
}