import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false,
})
export class ResetPasswordPage implements OnInit {

  email:any;

  constructor(public authService: AutheticationService, public router: Router) { }

  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(() => {
      console.log('reset link sent')
      this.router.navigate(['/login'])
    }).catch((erro) => {
      console.log(erro);
    })
  }
}
