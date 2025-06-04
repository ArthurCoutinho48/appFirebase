import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service'; // Serviço de autenticação personalizado
import { Journal, JournalServiceService } from 'src/app/services/journal-service.service'; // Modelo e serviço para os diários
import { JournalPage } from '../journal/journal.page'; // Página do modal de diário

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
  standalone: false,
})
export class JournalsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal; // Referência ao modal da interface para manipulação direta

  userId: any;              // Armazena o ID do usuário autenticado
  title: string = '';       // Título do novo diário
  content: string = '';     // Conteúdo do novo diário
  journals: Journal[] = []; // Lista de diários do usuário

  constructor(
    private authService: AutheticationService,        // Serviço de autenticação
    private journalService: JournalServiceService,    // Serviço de gerenciamento dos diários
    private toastCtrl: ToastController,               // Controlador de toast (mensagens)
    private modalCtrl: ModalController                // Controlador de modal
  ) { }

  // Método chamado ao cancelar a criação de um novo diário
  cancel() {
    this.modal.dismiss(null, 'cancel'); // Fecha o modal sem salvar
  }

  // Método chamado ao confirmar a criação de um novo diário
  confirm() {
    this.modal.dismiss('confirm'); // Fecha o modal
    this.addJournal() // Adiciona o diário
  }

  // Adiciona um novo diário ao Firestore
  addJournal() {
    this.journalService.addJournal({
      userId: "", // O userId real será atribuído no serviço
      title: this.title,
      content: this.content,
      createdAt: new Date() // Data atual como data de criação
    }).then(async () => {
      // Exibe um toast de sucesso
      const toast = await this.toastCtrl.create({
        message: "Journal added successful!",
        duration: 2000
      });
      toast.present();
    }).catch(async (erro) => {
      // Exibe um toast de erro
      const toast = await this.toastCtrl.create({
        message: erro,
        duration: 2000
      });
      toast.present();
    });
  }

  // Abre um modal com os detalhes de um diário específico
  async openJournal(journal: Journal) {
    const modal = await this.modalCtrl.create({
      component: JournalPage,            // Componente modal a ser aberto
      componentProps: { id: journal.id },// Passa o ID do diário como propriedade
      breakpoints: [0, 0.5, 0.8],         // Define os tamanhos possíveis do modal
      initialBreakpoint: 0.6             // Define o tamanho inicial do modal
    });
    await modal.present(); // Apresenta o modal
  }

  // Método executado ao iniciar a página
  ngOnInit() {
    this.authService.getProfile().then(user =>{
      this.userId = user?.uid; // Armazena o ID do usuário logado
      console.log(this.userId);
      
      // Busca os diários do usuário e os armazena
      this.journalService.getJournals(this.userId).subscribe(res =>{
        this.journals = res;
        console.log(this.journals);
      })
    })
  }

}
