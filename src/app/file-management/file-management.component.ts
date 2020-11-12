import { Component, OnInit, ElementRef, NgZone, Injectable, Input } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

import { Lession } from '../lession.enum';
import { Voca } from '../services/vocabulary.model';
import { VocaService } from '../services/vocabulary.service'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  lession: Lession;
  listOptions: Lession[] = [
    Lession.Action,
    Lession.Animal,
  ]

  constructor(private db: AngularFirestore, 
              private firebaseService: FirebaseService,
              public afAuth: AngularFireAuth,
              private storage: AngularFireStorage,
              private vocaService: VocaService,) { }

  ngOnInit(): void {
  }

  vocabulary: Voca = new Voca();

  newVoca() {
    this.vocabulary = new Voca();
    this.save()
  }

  save() {
    this.vocaService.createVoca(this.vocabulary)
    this.vocabulary = new Voca();
  }

  logout(){
    this.firebaseService.logOut();
  }

  randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  fb;
  fb1;
  downloadURLI: Observable<string>;
  downloadURL: Observable<string>;
  
  uploadImage(vocabulary) {
    var n = Date.now();
    const file = vocabulary.target.files[0];
    const filePath = `images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURLI = fileRef.getDownloadURL();
          this.downloadURLI.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  uploadAudio(vocabulary) {
    var n = Date.now();
    const file = vocabulary.target.files[0];
    const filePath = `audios/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`audios/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb1 = url;
            }
            console.log(this.fb1);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  parseValue(value: Lession) {
    this.lession = value;
  }

    creater() { 
      alert("successful")
      this.vocabulary.image = this.fb;
      this.vocabulary.audio = this.fb1;
      this.save();
    }
}
