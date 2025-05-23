import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Journal, JournalServiceService } from 'src/app/services/journal-service.service';
import { JournalPage } from '../journal/journal.page';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
  standalone: false,
})
export class JournalsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  userId:any;
  title:string = '';
  content:string = '';
  journals:Journal[] = [];

  constructor(
    private authService: AutheticationService,
    private journalService: JournalServiceService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
    this.addJournal()
  }

  addJournal(){
    this.journalService.addJournal({userId:"", title:this.title,content:this.content,createdAt:new Date()}).then(async () =>{
      const toast = await this.toastCtrl.create({
        message:"Journal added successful!",
        duration:2000
      })
      toast.present()
    }).catch(async (erro) =>{
      const toast = await this.toastCtrl.create({
        message: erro,
        duration: 2000
      })
      toast.present();
    })
  }

  async openJournal(journal:Journal){
    const modal = await this.modalCtrl.create({
      component: JournalPage,
      componentProps: {id:journal.id},
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.6
    })
    await modal.present();
  }

  ngOnInit() {
    this.authService.getProfile().then(user =>{
      this.userId = user?.uid;
      console.log(this.userId);
      this.journalService.getJournals(this.userId).subscribe(res =>{
        this.journals = res;
        console.log(this.journals);
      })
    })
  }

}
