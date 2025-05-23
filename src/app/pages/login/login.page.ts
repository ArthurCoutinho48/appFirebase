import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AutheticationService, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm?.controls;
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm?.valid){
      const user = await this.authService.loginUser(
        this.loginForm.value.email, 
        this.loginForm.value.password
      ).catch((erro) => {
        console.log(erro);
        loading.dismiss()
      })

      if (user){
        loading.dismiss();
        this.router.navigate(['/journals']);
      }else{
        console.log('provide correct values');
      }
    }
  }

  get fullname() {
    return this.loginForm.get('fullname');
  }

}
