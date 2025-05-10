 
import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignUp{
  email : FormControl<string | null>;
  password :FormControl<string | null>;

}


@Component({
  selector: 'app-sign-upt',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,GoogleButtonComponent], 
  templateUrl: './sign-upt.component.html',
  styles:'' 
})
export default class SignUptComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private  _router = inject (Router)

  isRequired(field:'email'| 'password'){
  return isRequired(field, this.form);

 }
 hasEmailError(){
  return hasEmailError(this.form);
 }

  form = this._formBuilder.group<FormSignUp>({
    email :this._formBuilder.control('',[
      Validators.required,
       Validators.email
      ]),
    password :this._formBuilder.control('',Validators.required)

  });
 async submit(){
    if (this.form.invalid)return;

 try{
  const {email,password} = this.form.value;

  if (!email || !password) return;

   this._authService.signIn({email,password})
   toast.success('usuario creado correactamnete');
   this._router.navigateByUrl('/tastks');

 }catch(error){
  toast.error('ocurrio un error');

 }
}
 async submitWithGoogle(){
  try{
    await this._authService.signInWithGoogle();
    toast.success('Bienvenido a la pagina');
    this._router.navigateByUrl('/tastks');

  }catch (error)
  {
    toast.error('ocurrio un error');

  }
 }


  

}
