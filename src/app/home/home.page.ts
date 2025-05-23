import { Component } from '@angular/core';
import { AutheticationService } from '../services/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  user:any;

  constructor(public authService: AutheticationService, public router: Router) {
    this.user = authService.getProfile();
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing'])
    }).catch((erro) => {
      console.log(erro)
    })
  }
}
