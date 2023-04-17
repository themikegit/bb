import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
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
  news$!: Observable<any>;
  isVisible: boolean = false;
  isVisibleNews: boolean = false;

  selectedWod: any;
  selectedNews: any;
  selectedRow: any;

  newsTitle!: string;
  newsDescription!: string;

  editMode!: boolean;

  active!: boolean;

  wodForm = new FormGroup({
    title: new FormControl(),
    active: new FormControl(),

    description1: new FormControl(),
    video1: new FormControl(),

    description2: new FormControl(),
    video2: new FormControl(),

    description3: new FormControl(),
    video3: new FormControl(),

    description4: new FormControl(),
    video4: new FormControl(),
  });

  ngOnInit() {
    this.active = true;
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

    this.news$ = this.afs
      .collection('/news')
      .snapshotChanges()
      .pipe(
        map((news: any) => {
          return news.map((n: any) => {
            const data = n.payload.doc.data();
            const id = n.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  editWod(ch: any) {
    this.editMode = true;
    this.selectedWod = ch;
    this.wodForm.patchValue(ch);
    this.isVisible = !this.isVisible;
    this.active = ch.active;
  }

  addWod() {
    this.editMode = false;
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  saveWod() {
    if (this.editMode) {
      this.afs
        .collection('wod')
        .doc(this.selectedWod.id)
        .update(this.wodForm.value);
    }
    if (!this.editMode) {
      const body: any = this.wodForm.value;
      body.date = new Date();
      this.afs.collection('wod').add(body);
    }
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  deleteWod() {
    this.afs.collection('wod').doc(this.selectedWod.id).delete();
    this.isVisible = !this.isVisible;
    this.resetForm();
  }

  addNews() {
    this.editMode = false;
    this.isVisibleNews = !this.isVisibleNews;
    this.resetForm();
  }
  saveNews() {
    if (this.editMode) {
      this.afs.collection('news').doc(this.selectedNews.id).update({
        title: this.newsTitle,
        description: this.newsDescription,
      });
    }
    if (!this.editMode) {
      this.afs.collection('news').add({
        title: this.newsTitle,
        description: this.newsDescription,
      });
    }
    this.isVisibleNews = !this.isVisibleNews;
    this.resetForm();
  }
  editNews(news: any) {
    this.editMode = true;
    this.selectedNews = news;
    this.newsTitle = news.title;
    this.newsDescription = news.description;
    this.isVisibleNews = !this.isVisibleNews;
  }
  deleteNews() {
    this.afs.collection('news').doc(this.selectedNews.id).delete();
    this.isVisibleNews = !this.isVisibleNews;
    this.resetForm();
  }

  resetForm() {
    this.active = false;
    this.wodForm.reset();
  }
}
