import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  // GET /api/authors
  // GET /api/authors?first=1&last=10&topic=angular&nbArticles=4
  fetchAuthors(data: any): Observable<any> {
    return of([
      { author: 'author 1' },
      { author: 'author 2' },
      { author: 'author 3' },
    ]);
  }

  // GET /api/articles
  // GET /api/articles?first=1&last=10&topic=angular
  fetchArticles(data: any): Observable<any> {
    return of([
      { name: 'article 1' },
      { author: 'article 2' },
      { author: 'article 3' },
    ]);
  }

  // GET /api/authors/:id/articles
  fetchArticlesByAuthor(authorId: number): Observable<any> {
    return of([{ name: 'article 1' }, { author: 'article 2' }]);
  }
}
