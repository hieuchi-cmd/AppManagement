import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { User1 } from '../services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  user1: User1[];
  editingUser: User1;
  editing: boolean=false;

  constructor(  private firebaseService: FirebaseService,
                private afAuth: AngularFireAuth, 
                private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user =>{
      this.user1=user;
    })
  }

  deleteUser(key: string){
    this.userService.deleteUser(key);
  }

  edit1(event, user){
    this.editingUser=user;
    this.editing=!this.editing;
  }
  
  updateUser(){
    this.userService.updateUser(this.editingUser);
    this.editingUser={} as User1;
    this.editing=false;
  }

  logout(){
    this.firebaseService.logOut();
  }


}
