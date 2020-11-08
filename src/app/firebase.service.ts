import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
// import { Organizer } from './services/organizer.model';
// import { Organizer1 } from './services/organizer';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // private dbPath = '/organizer';
  // organiserRef: AngularFirestoreCollection<Organizer> = null;
  // organizerDoc;

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore , private router: Router) {
    // this.organiserRef = firestore.collection(this.dbPath);
  }

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string>;

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges = new BehaviorSubject<string>(this.userStatus);
    this.userStatusChanges.next(userStatus);
  }

  login(email: string, password: string) {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser)
            if(userRef.data().role == "admin") {
              this.router.navigate(["/mainpage"]);
            }
          })
        })
       
      }).catch(err => err)
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("users").ref.where("email", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)
            
            if(userRef.data().role == "admin") {
             this.ngZone.run(() => this.router.navigate(["/mainpage"])); 
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/login"]));
      }
    })
  }

}
