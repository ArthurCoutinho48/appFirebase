import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular'; // Controladores de modal e toast do Ionic
import { Journal, JournalServiceService } from 'src/app/services/journal-service.service'; // Modelo e serviço de manipulação de "Journal"

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
  standalone: false,
})
export class JournalPage implements OnInit {
  // Decorador @Input permite receber dados de outro componente (no caso, o ID do journal)
  @Input() id:string = '';

  // Objeto que representará o journal carregado
  journal: Journal | undefined;

  // Injeção de dependência dos serviços utilizados
  constructor(
    private journalService: JournalServiceService, // Serviço para manipular journals
    private toastCtrl: ToastController,             // Serviço para exibir notificações toast
    private modalCtrl: ModalController              // Serviço para controlar o modal
  ) {}

  // Método que será executado ao inicializar o componente
  ngOnInit() {
    console.log(this.id); // Apenas para debug: exibe o ID no console

    // Recupera o journal com base no ID recebido via @Input e atribui ao objeto `journal`
    this.journalService.getJournalById(this.id).subscribe(res => {
      this.journal = res;
    });
  }

  // Método chamado ao atualizar um journal
  async updateJournal() {
    // Atualiza o journal com os dados atuais
    this.journalService.updateJournal(this.journal!);

    // Cria e exibe uma notificação (toast) indicando que o journal foi atualizado
    const toast = await this.toastCtrl.create({
      message: 'Journal Updated!',
      duration: 2000
    });
    toast.present();

    // Fecha o modal após a atualização
    this.modalCtrl.dismiss();    
  }

  // Método chamado ao deletar um journal
  async deleteJournal() {
    // Remove o journal com base no ID
    await this.journalService.removeJournal(this.id);

    // Fecha o modal após a exclusão
    this.modalCtrl.dismiss(); 
  }
}
