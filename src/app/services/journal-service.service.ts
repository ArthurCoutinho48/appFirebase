import { Injectable } from '@angular/core';
import { AutheticationService } from './authetication.service'; // Importa o serviço de autenticação personalizado
import {
  addDoc,          // adiciona um novo documento a uma coleção
  collection,      // referência a uma coleção
  collectionData,  // observa os dados de uma coleção como um Observable
  deleteDoc,       // deleta um documento
  doc,             // referência a um documento específico
  docData,         // observa os dados de um documento como um Observable
  Firestore,       // tipo principal para acessar o Firestore
  query,           // cria uma consulta
  updateDoc,       // atualiza campos de um documento
  where            // cria cláusulas de filtro para queries
} from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // Importa o tipo Observable do RxJS, usado para reatividade

export class Journal{
  id?: string;         // id opcional do diário (atribuído automaticamente pelo Firestore)
  userId: string;      // id do usuário que criou o diário
  title: string;       // título do diário
  content: string;     // conteúdo do diário
  createdAt: any;      // data de criação (tipo any para flexibilidade)

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

  // Injeta o serviço de autenticação e o Firestore no construtor
  constructor(
    private authService: AutheticationService, 
    private firestore: Firestore
  ) { }

  // Método para adicionar um novo diário
  async addJournal(jounal:Journal){
    const user = await this.authService.getProfile(); // obtém o usuário autenticado
    if (!user?.uid) throw new Error('Usuário não autenticado.'); // verifica se o usuário está logado
    jounal.userId = user.uid; // define o ID do usuário no diário

    const journalRef = collection(this.firestore,"journals"); // referência à coleção "journals"
    return addDoc(journalRef, jounal); // adiciona o diário ao Firestore
  }

  // Retorna todos os diários de um determinado usuário (relação 1:N)
  getJournals(userId:any): Observable<Journal[]>{
    const journalRef = collection(this.firestore, "journals"); // Referência à coleção
    const refquery = query(journalRef, where('userId', '==', userId)); // Consulta filtrando por userId

    return collectionData(refquery, {idField:'id'}) as Observable<Journal[]>; // Retorna os dados como array reativo

  }

  // Retorna um diário específico pelo ID (consulta 1:1)
  getJournalById(id:any): Observable<Journal>{
    const journalRef = doc(this.firestore, `journals/${id}`); // Referência ao documento com ID específico
    return docData(journalRef, {idField:'id'}) as Observable<Journal>; // Retorna o diário como Observable
  }

  // Atualiza o título e conteúdo de um diário existente
  updateJournal(journal:Journal){
    const journalRef = doc(this.firestore, `journals/${journal.id}`); // Referência ao documento
    return updateDoc(journalRef, {title:journal.title, content:journal.content}); // Atualiza campos específicos
  }

  // Remove um diário pelo ID
  removeJournal(id:any){
    const journalRef = doc(this.firestore, `journals/${id}`); // Referência ao documento
    return deleteDoc(journalRef); // Exclui o documento do Firestore
  }
}
