import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { ListLevel } from '../enums/class';
import { ArticleModel } from '../models/article-model';
import { ApiService } from '../services/api.service';
import { ArticlesListService } from '../services/articles-list.service';
import { AuthorsListService } from '../services/authors-list.service';
import { ListService, ListType } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [AuthorsListService, ArticlesListService],
})
export class ListComponent implements OnInit, OnDestroy {
  public listTitle!: string;
  public showNbOfArticlesDropdown!: boolean;
  public list$!: Observable<ListType>;
  private listService: ListService;
  private subscriptions = new Subscription();

  constructor(private injector: Injector, private apiService: ApiService) {
    this.listService = this.listServiceFactory(ListLevel.AUTHORS);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.listService.listLevel$
        .pipe(
          tap((listLevel: ListLevel) => {
            this.listService = this.listServiceFactory(listLevel);
            this.initListData();
          })
        )
        .subscribe()
    );
  }

  public getArticlesByAuthor(authorId: number): Observable<ArticleModel[]> {
    return this.apiService.fetchArticlesByAuthor(authorId);
  }

  private initListData(): void {
    this.list$ = this.listService.getList();
    this.listTitle = this.listService.listTitle;
    this.showNbOfArticlesDropdown = this.listService.showNbOfArticlesDropdown;
  }

  private listServiceFactory(listLevel: ListLevel): ListService {
    switch (listLevel) {
      case ListLevel.AUTHORS:
        return this.injector.get(AuthorsListService);
      case ListLevel.ARTICLES:
        return this.injector.get(ArticlesListService);
    }
  }

  selectAuthors() {
    this.listService.listLevel$.next(ListLevel.AUTHORS);
  }

  selectArticles() {
    this.listService.listLevel$.next(ListLevel.ARTICLES);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
