import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent {
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  challenges$!: Observable<any>;
  isVisible: boolean = false;
  uid!: string | null;
  selectedChc = {
    id: '',
    title: '',
    description: '',
    status: '',
  };

  ngOnInit() {
    this.uid = localStorage.getItem('uid');
    this.challenges$ = this.afs
      .collection('/wod')
      .snapshotChanges()
      .pipe(
        map((wods: any) => {
          return wods.map((w: any) => {
            const id = w.payload.doc.id;
            const data = w.payload.doc.data();
            if (data.users?.some((w: any) => w.uid === this.uid)) {
              console.log('padd');

              data.status = 'COMPLETED';
            }
            console.log(data.users);

            return { id, ...data };
          });
        })
      );
  }

  completeWod() {
    this.afs
      .collection('/wod')
      .doc(this.selectedChc.id)
      .update({
        users: arrayUnion({
          uid: this.uid,
        }),
      });
    this.isVisible = !this.isVisible;
  }

  cardClick(id: string, data: any) {
    this.selectedChc = data.find((i: any) => i.id === id);
    this.isVisible = !this.isVisible;
  }
}
