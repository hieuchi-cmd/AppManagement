import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewVocabulary(record) {
    return this.firestore.collection('Vocabulary').add(record);
  }
 
  read_ListVocabulary() {
    return this.firestore.collection('Vocabulary').snapshotChanges();
  }
 
  update_ListVocabulary(recordID,record){
    this.firestore.doc('Vocabulary/' + recordID).update(record);
  }
 
  delete_Vocabulary(record_id) {
    this.firestore.doc('Vocabulary/' + record_id).delete();
  }
}