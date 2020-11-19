import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  @Input() numberOfUser: number;
  @Input() numberOfVoca: number;
  constructor(private db: AngularFirestore, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.db.collection('users').get().toPromise().then(snap => {
      this.numberOfUser = snap.size // will return the collection size
   });
   this.db.collection('Vocabulary').get().toPromise().then(snap => {
    this.numberOfVoca = snap.size // will return the collection size
 });
  }

  logout(){
    this.firebaseService.logOut();
  }

}
