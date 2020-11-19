import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Voca } from './vocabulary.model'
import { Voca1 } from './vocabulary'

export class VocabularyList{
    vocabularyCollection: AngularFirestoreCollection<Voca1>;
    vocabularyList: Observable<Voca1[]>;
    constructor(public afs:AngularFirestore){
        this.vocabularyList = afs.collection('Vocabulary').valueChanges();
    }
    getVocabularyList(){
        return this.vocabularyList;
    }
}
