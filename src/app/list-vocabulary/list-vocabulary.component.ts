import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Voca1 } from '../services/vocabulary'
import { Voca } from '../services/vocabulary.model'
import { VocaService } from '../services/vocabulary.service'
import { Admin1 } from '../services/admin';
import { CrudService } from '../services/CRUD.service';
import { Lession } from '../lession.enum';
import { HighlightPipe } from './highlight.pipe';

@Component({
  selector: 'app-list-vocabulary',
  templateUrl: './list-vocabulary.component.html',
  styleUrls: ['./list-vocabulary.component.scss']
})
export class ListVocabularyComponent implements OnInit {

  public selectedLession;
  filtered: any;
  VocaList: Admin1[];
  vocabularies: any;
  lession: Lession;
  listOptions: Lession[] = [
    Lession.Actions,
    Lession.Alphabets,
    Lession.Animals,
    Lession.Body,
    Lession.Careers,
    Lession.Colors,
    Lession.Emotions,
    Lession.Foods,
    Lession.Fruits,
    Lession.Home,
    Lession.Landscapes,
    Lession.Numbers,
    Lession.Sports,
    Lession.Transprots,
  ]

  search: string;
  searchedItems: any[];
  highlightPipe = new HighlightPipe();

  constructor(private db: AngularFirestore,
              private firebaseService: FirebaseService,
              public vocaService: VocaService,
              private crudService: CrudService
              ) { }

  ngOnInit(): void {
    this.vocaService.getListVocabulary().subscribe( VocaList => {
      this.VocaList = VocaList;
    })

    this.crudService.read_ListVocabulary().subscribe(data => {
      this.vocabularies = data.map(e => {
        return {
          highlight: false,
          id: e.payload.doc.id,
          isEdit: false,
          eng: e.payload.doc.data()['eng'],
          vi: e.payload.doc.data()['vi'],
          image: e.payload.doc.data()['image'],
          lession: e.payload.doc.data()['lession']
        };
      })
    });
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditEng = record.eng;
    record.EditVi = record.vi;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['eng'] = recordRow.EditEng;
    record['nvi'] = recordRow.EditVi;
    this.crudService.update_ListVocabulary(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Vocabulary(rowID);
  }

  public valueSelected() {
    this.filtered = this.vocabularies.filter(item => item.lession == this.selectedLession);
    console.log(this.filtered.eng);
  }

  VocabularySearch(input) {
    this.search = input;
    this.searchedItems = this.highlightPipe.transform(this.vocabularies, input, true);
    // only names --> const names = this.searchedItems.map(item => item.label);
    console.log(this.searchedItems);
  }

  logout(){
    this.firebaseService.logOut();
  }

}
