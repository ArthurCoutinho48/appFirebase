import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public auth: Auth) { }

  // Registro de Usuário
  async registerUser(email:string, password:string){
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  // Login
  async loginUser(email:string, password:string){
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  // Recuperar Senha
  async resetPassword(email:string){
    return await sendPasswordResetEmail(this.auth, email)
  }

  async signOut(){
    return await signOut(this.auth)
  }

  async getProfile(){
    return new Promise<User | null> ((resolve, reject) => {
      onAuthStateChanged (this.auth, user =>{
        if(user){
          resolve(user as any)
        }else{
          resolve(null)
        }
      }, reject)
    })
  }
}
