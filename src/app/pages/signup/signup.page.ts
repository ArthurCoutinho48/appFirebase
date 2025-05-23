import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage implements OnInit {
  
  regForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AutheticationService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
      ]],
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid){
      const user = await this.authService.registerUser(
        this.regForm.value.email, 
        this.regForm.value.password
      ).catch((erro) => {
        console.log(erro);
        loading.dismiss()
      })

      if (user){
        loading.dismiss();
        this.router.navigate(['/home']);
      }else{
        console.log('provide correct values');
      }
    }
  }

  get fullname() {
    return this.regForm.get('fullname');
  }
}
