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

  // Declara uma variável para armazenar as informações do usuário
  user: any;

  constructor(
    public authService: AutheticationService, 
    public router: Router) {
    // Obtém o perfil do usuário a partir do serviço de autenticação ao inicializar a página
    this.user = authService.getProfile();
  }

  // Método assíncrono para realizar logout
  async logout() {
    // Chama o método signOut do serviço de autenticação
    this.authService.signOut().then(() => {
      // Se o logout for bem-sucedido, navega para a página de "landing"
      this.router.navigate(['/landing']);
    }).catch((erro) => {
      // Em caso de erro, exibe no console
      console.log(erro);
    });
  }
}
