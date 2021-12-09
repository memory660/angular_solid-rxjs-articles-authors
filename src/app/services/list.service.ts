import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { PaginationModel } from '../models/pagination-model';
import { ListLevel } from '../enums/class';
import { AuthorModel } from '../models/author-model';
import { ArticleModel } from '../models/article-model';

export type ListType = AuthorModel[] | ArticleModel[];

@Injectable()
export abstract class ListService {
  public listLevel$: BehaviorSubject<ListLevel>;
  public nbArticles$: Observable<number>;
  public pagination$: Observable<PaginationModel>;
  public topic$: Observable<string>;

  abstract listTitle: string;
  abstract showNbOfArticlesDropdown: boolean;

  constructor(
    protected apiService: ApiService,
    protected storeService: StoreService
  ) {
    this.listLevel$ = this.storeService.getSelectListLevel();
    this.nbArticles$ = this.storeService.getSelectNbOfArticles();
    this.pagination$ = this.storeService.getSelectPagination();
    this.topic$ = this.storeService.getSelectTopic();
  }

  abstract getList(): Observable<ListType>;
}
