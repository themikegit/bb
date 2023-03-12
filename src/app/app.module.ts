import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ButtonModule } from 'primeng/button';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarModule } from 'primeng/calendar';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';

import { TableModule } from 'primeng/table';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { VideoUrlPipe } from './pages/challenge/video-url.pipe';
import { VideoFrameComponent } from './components/video-frame/video-frame.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ScrollerModule } from 'primeng/scroller';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    PageHeaderComponent,
    ChallengeComponent,
    HomeComponent,
    AdminComponent,
    VideoUrlPipe,
    VideoFrameComponent,
    VerifyMailComponent,
    SignInComponent,
    SignUpComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RippleModule,
    ButtonModule,
    CalendarModule,
    EditorModule,
    InputTextModule,
    SidebarModule,
    TableModule,
    ToastModule,
    DropdownModule,
    MessageModule,
    InputSwitchModule,
    TabViewModule,
    ScrollerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
