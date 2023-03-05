import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}
  challenges$!: Observable<any>;
  isVisible: boolean = false;
  selectedWod: any;
  selectedRow: any;

  description!: string;
  title!: string;
  date!: Date;

  editMode!: boolean;

  ngOnInit() {
    this.challenges$ = this.afs
      .collection('/wod')
      .snapshotChanges()
      .pipe(
        map((wods: any) => {
          return wods.map((w: any) => {
            const data = w.payload.doc.data();
            const id = w.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  editWod(ch: any) {
    this.editMode = true;
    this.selectedWod = ch;
    this.title = ch.title;
    this.description = ch.description;
    this.isVisible = !this.isVisible;
    this.date = ch.date?.toDate();
  }

  addWod() {
    this.editMode = false;
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  saveWod() {
    if (this.editMode) {
      this.afs.collection('wod').doc(this.selectedWod.id).update({
        title: this.title,
        description: this.description,
        date: this.date,
      });
    }
    if (!this.editMode) {
      this.afs.collection('wod').add({
        title: this.title,
        description: this.description,
        date: this.date,
      });
    }
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  deleteWod() {
    this.afs.collection('wod').doc(this.selectedWod.id).delete();
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  resetForm() {
    this.description = '';
    this.title = '';
    this.date = new Date();
  }
}
