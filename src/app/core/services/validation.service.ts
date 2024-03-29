import {AbstractControl, FormControl} from '@angular/forms';
import {isDevMode} from '@angular/core';


export class ValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'email': `validation.email`,
            'required': 'validation.required',
            'invalidEmailAddress': 'validation.invalid_email_address',
            'currentPassword': 'validation.current_password',
            'primary': 'validation.primary',
            'invalidConfirmPassword': 'validation.invalid_confirm_password',
            'invalidPassword': `validation.invalid_password`,
            'maxlength': 'validation.max_length',
            'invalidDecimal': 'validation.invalid_decimal'
        };



        // const config = {
        //
        //
        //     'email': `Email type is not correct`,
        //     'required': 'Required field',
        //     'invalidEmailAddress': 'validation.invalidEmailAddress',
        //     'currentPassword': 'validation.currentPassword',
        //     'primary': 'validation.primary',
        //     'invalidConfirmPassword': 'Passwords do not match',
        //     'invalidPassword': `Password must be at least 8 characters long, contain UPPERCASE and  lowercase letters, a number or a symbol`,
        //     'maxlength': 'You have exceeded the maximum allowed number of characters',
        //     'invalidDecimal': 'Invalid value'
        // };

        return config[validatorName];
    }

    static emailValidator(control) {
        if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {'email': true};
        }
    }

    static passwordValidator(control) {
        if (control.value && control.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            return null;
        } else {
            return {'invalidPassword': true};
        }
    }

    static passwordsEqualValidator(c: FormControl) {
        if (c.value && c.value.password.length > 0 &&
            (c.value.confirmPassword.length > 0 &&
                c.value.password !== c.value.confirmPassword)) {
            return {'invalidConfirmPassword': true};
        } else {
            return null;
        }
    }

    static decimal(event: any, formValue) {
        let input;
        let regex = /^([0-9]+\.?[0-9]{0,8})$/;

        if (event.type === 'paste') {
            let value = event.clipboardData.getData('Text');
            input = formValue ? formValue + value : value;
        } else if (event.type === 'keypress' && event.key) {
            input = formValue ? formValue + event.key : event.key;
        }

        if (!(regex.test(input))) {
            if (isDevMode()) {
                console.log(input, 'is not a number');
            }
            event.preventDefault();
        }
    }
}
