import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  constructor(private db: AngularFirestore, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logOut();
  }

}
