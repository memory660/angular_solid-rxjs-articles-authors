import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleModel } from '../models/article-model';
import { ListService } from './list.service';

@Injectable()
export class ArticlesListService extends ListService {
  public listTitle = 'Interesting articles!';
  public showNbOfArticlesDropdown = false;

  public getList(): Observable<ArticleModel[]> {
    return combineLatest([this.pagination$, this.topic$, this.listLevel$]).pipe(
      switchMap(([{ first, last }, topic]) => {
        return this.apiService.fetchArticles({ first, last, topic });
      })
    );
  }
}
