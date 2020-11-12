import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Voca } from './vocabulary.model';

@Injectable({
  providedIn: 'root'
})
export class VocaService {
  private dbPath = '/Vocabulary';
 
  vocabularyRef: AngularFirestoreCollection<Voca> = null;
 
  constructor(private db: AngularFirestore) {
    this.vocabularyRef = db.collection(this.dbPath);
  }
  createVoca(Vocabulary: Voca): void {
    this.vocabularyRef.add({...Vocabulary});
  }
}