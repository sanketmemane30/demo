import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }
    // login method
    login(email : string, password : string) {
      this.fireauth.signInWithEmailAndPassword(email,password).then( res => {

          localStorage.setItem('token','true');
          this.router.navigate(['/register']);

      
          // if(res.user?.emailVerified == true) {
          //   this.router.navigate(['/register']);
          // } else {
          //   this.router.navigate(['/varify-email']);
          // }
  
      }, (err: { message: any; }) => {
          alert(err.message);
          this.router.navigate(['/login']);
      })
    }
  
    // register method
    register(email : string, password : string) {
      this.fireauth.createUserWithEmailAndPassword(email, password).then( (res: { user: any; }) => {
        alert('Registration Successful');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      }, (err: { message: any; }) => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }
  sendEmailForVarification(user: any) {
    throw new Error('Method not implemented.');
  }
  
    // sign out
    logout() {
      this.fireauth.signOut().then( () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, (err: { message: any; }) => {
        alert(err.message);
      })
    }
  
}
