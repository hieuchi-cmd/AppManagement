import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Voca } from './vocabulary.model';
import { Admin1 } from './admin'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VocaService {
  private dbPath = '/Vocabulary';
 
  vocabularyRef: AngularFirestoreCollection<Voca> = null;

  getVocabulary: Observable<Admin1[]>;
 
  constructor(private db: AngularFirestore) {
    this.vocabularyRef = db.collection(this.dbPath);
    this.getVocabulary = db.collection('Vocabulary').valueChanges();
  }
  createVoca(Vocabulary: Voca): void {
    this.vocabularyRef.add({...Vocabulary});
  }
  getListVocabulary(){
    return this.getVocabulary;
  }
}