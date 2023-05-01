import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password?.value === confirmPassword?.value ? null : { notSame: true };
  };


  export const userHasAtLeastOneRoleValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isTeacher = control.get('isTeacher');
    const isStudent = control.get('isStudent');
    return (isStudent?.value || isTeacher?.value) ? null : { noRoles: true };
  };

  export const requiredFileType: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let file : any = control.get('image');
    return file?.value.size > 0 ? null : { noFile: true };
  }

