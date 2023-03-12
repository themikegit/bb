import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
  providers: [MessageService],
})
export class ChallengeComponent {
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    public sanit: DomSanitizer,
    public messageService: MessageService
  ) {}

  challenges$!: Observable<any>;
  isVisible: boolean = false;
  user!: any;
  selectedChc = {
    id: '',
    title: '',
    description: '',
    status: '',
    video: '',
  };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.challenges$ = this.afs
      .collection('/wod')
      .snapshotChanges()
      .pipe(
        map((wods: any) => {
          return wods.map((w: any) => {
            const id = w.payload.doc.id;
            const data = w.payload.doc.data();
            if (data.users?.some((w: any) => w.uid === this.user.uid)) {
              data.status = 'COMPLETED';
            }

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
          uid: this.user.uid,
        }),
      });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Congratulations! Goal completed',
    });
    this.isVisible = !this.isVisible;
  }

  cardClick(id: string, data: any) {
    this.selectedChc = data.find((i: any) => i.id === id);
    this.isVisible = !this.isVisible;
  }
}
