import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ListLevel } from '../enums/class';
import { PaginationModel } from '../models/pagination-model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public listLevel$ = new BehaviorSubject(ListLevel.AUTHORS);

  constructor() {}

  getSelectListLevel(): BehaviorSubject<ListLevel> {
    return this.listLevel$;
  }

  getSelectNbOfArticles(): Observable<number> {
    return of(4);
  }

  getSelectPagination(): Observable<PaginationModel> {
    return of({ first: 0, last: 3 } as PaginationModel);
  }

  getSelectTopic(): Observable<string> {
    return of('Angular');
  }
}
