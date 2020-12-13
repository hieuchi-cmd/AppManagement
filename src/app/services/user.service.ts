import { Injectable } from '@angular/core';
import { User } from '../services/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User1 } from '../services/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User1>;
  user: Observable<User1[]>;
  user1: User;
  private dbPath = '/users';
  userRef: AngularFirestoreCollection<User> = null;
  userDoc;
  constructor(public afs: AngularFirestore, private auth: AngularFireAuth) { 
    this.user = afs.collection('users').valueChanges();
    this.userRef = afs.collection(this.dbPath);
  }
  deleteUser(key: string): Promise<void> {
    return this.userRef.doc(key).delete();
  }
  updateUser(user:User1){
    this.userDoc=this.afs.doc(`users/${user.uid}`);
    this.userDoc.update(user)
  }
  getUser(){
    return this.user;
  }
}
