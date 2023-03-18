import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedNews!: any;
  isVisible!: boolean;
  news$!: Observable<any>;
  constructor(private afs: AngularFirestore) {}

  openNews(news: any) {
    this.isVisible = !this.isVisible;
    this.selectedNews = news;
  }

  ngOnInit() {
    this.news$ = this.afs.collection('/news').valueChanges();
  }
}
