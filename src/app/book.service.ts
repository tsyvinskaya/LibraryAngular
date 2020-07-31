import { Injectable } from '@angular/core';
import { BooksList } from './booksList';
import { Book } from './book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  getBooks(): Observable<Book[]> {
    return of(BooksList);
  }

  getBooksFromLocalStorage() {
    return of(JSON.parse(localStorage.getItem('allEntries')));
  }

}
