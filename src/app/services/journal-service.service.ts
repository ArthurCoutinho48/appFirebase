import { Injectable } from '@angular/core';
import { AutheticationService } from './authetication.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

export class Journal{
  id?:string;
  userId:string;
  title:string;
  content:string;
  createdAt:any;

  constructor(userId:string, title:string, content:string, createdAt:any){
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}

@Injectable({
  providedIn: 'root'
})
export class JournalServiceService {

  userId:any;

  constructor(private authService: AutheticationService, private firestore: Firestore) {
    this.authService.getProfile().then(user => {
      this.userId = user?.uid
      console.log(this.userId);
    })
  }

  addJournal(jounal:Journal){
    jounal.userId = this.userId;

    const journalRef = collection(this.firestore,"journals");
    return addDoc(journalRef,jounal);
  }
}
