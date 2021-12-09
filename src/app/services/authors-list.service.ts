import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthorModel } from '../models/author-model';
import { ListService } from './list.service';

@Injectable()
export class AuthorsListService extends ListService {
  public listTitle = 'Weekly best authors!';
  public showNbOfArticlesDropdown = true;

  public getList(): Observable<AuthorModel[]> {
    return combineLatest([this.pagination$, this.topic$, this.listLevel$]).pipe(
      switchMap(([{ first, last }, topic]) => {
        return this.nbArticles$.pipe(
          switchMap((nbArticles) => {
            return this.apiService.fetchAuthors({
              first,
              last,
              topic,
              nbArticles,
            });
          })
        );
      })
    );
  }
}
