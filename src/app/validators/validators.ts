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

  export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
          return {
            requiredFileType: true
          };
        }
        
        return null;
      }
  
      return null;
    };
  }

