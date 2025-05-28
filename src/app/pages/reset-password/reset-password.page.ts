import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service'; // Importa o serviço de autenticação personalizado

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false,
})
export class ResetPasswordPage implements OnInit {

  // Variável que armazena o e-mail do usuário (ligado ao input no template)
  email:any;

  constructor(
    public authService: AutheticationService, // Serviço responsável pela lógica de resetar a senha
    public router: Router // Serviço do Angular para navegação entre páginas
  ) { }

  ngOnInit() {
  }

  // Método assíncrono chamado quando o usuário solicita o reset de senha
  async resetPassword() {
    this.authService.resetPassword(this.email)   // Chama o método resetPassword passando o e-mail
      .then(() => {
        console.log('reset link sent');          // Exibe no console que o link foi enviado
        this.router.navigate(['/login']);        // Redireciona o usuário para a página de login
      })
      .catch((erro) => {
        console.log(erro);                       // Caso ocorra erro, exibe no console
      });
  }
}
