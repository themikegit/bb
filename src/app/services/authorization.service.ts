import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  user$ = new Subject();

  logIn(value: any) {
    this.fireAuth
      .signInWithEmailAndPassword(value.username, value.password)
      .then(
        (val) => {
          const uid: string = val?.user?.uid ?? '';
          localStorage.setItem('uid', uid);
          this.router.navigateByUrl('admin');
        },
        (err) => {
          alert('something went wrong');
        }
      );
  }

  logOut() {
    this.fireAuth.signOut().then((val) => {
      this.router.navigateByUrl('login');
    });
  }
}
