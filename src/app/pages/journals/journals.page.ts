import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
  standalone: false,
})
export class JournalsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  userId:any;
  title:string;
  content:string;

  constructor(private authService: AutheticationService) { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    //this.modal.dismiss(this.name, 'confirm');
  }

  ngOnInit() {
    this.authService.getProfile().then(user =>{
      this.userId = user?.uid;
      console.log(this.userId);
    })
  }

}
