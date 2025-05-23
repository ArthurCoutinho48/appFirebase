import { Injectable } from '@angular/core';
import { AutheticationService } from './authetication.service';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(
    private authService: AutheticationService, 
    private firestore: Firestore) {
  }

  async addJournal(jounal:Journal){
    const user = await this.authService.getProfile();
    if (!user?.uid) throw new Error('Usuário não autenticado.');

    jounal.userId = user.uid;

    const journalRef = collection(this.firestore,"journals");
    return addDoc(journalRef, jounal);
  }

  getJournals(userId:any): Observable<Journal[]>{
    const journalRef = collection(this.firestore, "journals");
    const refquery = query(journalRef, where('userId', '==', userId));

    return collectionData(refquery, {idField:'id'}) as Observable<Journal[]>;

  }
}
