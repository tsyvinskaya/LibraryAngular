import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../book';
import { Author } from '../author';
import { BookService } from '../book.service';
import { AuthorsComponent } from '../authors/authors.component';
import { GenresService } from '../genres.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { __values } from 'tslib';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[];
  myForm: FormGroup;
  selectedBook: Book;
  deletedBook: Book;
  genres: string [];
  authors: Author[];
  entry: Book = {
    name: '',
    genre: '',
    numberOfPages: 0,
    authorLastName: '',
  };
  editBook: number = 0;
  dataSource: MatTableDataSource<Book>;
  sortedData: Book[];
  searchText;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public AuthorsComponent: AuthorsComponent,
    public genresService:GenresService 
  ) {
    this.myForm = formBuilder.group({
      bookName: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      pages: ['', [Validators.required, Validators.max(10000)]],
      authorLastName: ['', [Validators.required]],
    });

    this.bookService
      .getBooksFromLocalStorage()
      .subscribe((books) => (this.books = books));
    if (this.books == null) {
      this.bookService.getBooks().subscribe((books) => (this.books = books));
    }
    this.dataSource = new MatTableDataSource(this.books);
    this.sortedData = this.books.slice();
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.setAuthors();
    this.getGenres();
  }

  setAuthors() {
    this.authors = JSON.parse(localStorage.getItem('allAuthors'));
    if (this.authors == null) {
      this.authors = this.AuthorsComponent.authors;
    }
  };

  getGenres(): void {this.genresService.getGenres().subscribe((genres) => (this.genres = genres))
  }

  setGenre(genre): void {this.genresService.setGenre(genre)
  }

  setBooks() {
    this.bookService
      .getBooksFromLocalStorage()
      .subscribe((books) => (this.books = books));
  }
  setBooksAtLocalStorage() {
    localStorage.setItem('allEntries', JSON.stringify(this.books));
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }
  submit() {
    this.addBook();
  }
  addBook() {
    this.setAuthors();
    this.entry.name = this.myForm.controls['bookName'].value;
    this.entry.genre = this.myForm.controls['genre'].value;
    this.entry.numberOfPages = this.myForm.controls['pages'].value;
    this.entry.authorLastName = this.myForm.controls['authorLastName'].value;
    this.books.push(this.entry);
    this.setBooksAtLocalStorage();
    this.setBooks();
    this.myForm.reset(__values);
    this.dialog.closeAll();
  }
  onSelect(book: Book): void {
    this.selectedBook = book;
  }
  editSelectedBook() {
    this.editBook = 1;
  }
  saveEditedBook() {
    this.editBook = 0;
    this.setBooksAtLocalStorage();
    this.dialog.closeAll();
  }
  deleteBook() {
    if (this.books.indexOf(this.selectedBook) > -1) {
      this.books.splice(this.books.indexOf(this.selectedBook), 1);
      this.setBooksAtLocalStorage();
      delete this.selectedBook;
      this.dialog.closeAll();
    }
  }
  sortData(sort: Sort) {
    const data = this.books.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = this.books.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'genre':
          return compare(a.genre, b.genre, isAsc);
        case 'numberOfPages':
          return compare(a.numberOfPages, b.numberOfPages, isAsc);
        case 'authorLastName':
          return compare(a.authorLastName, b.authorLastName, isAsc);
        default:
          return 0;
      }
    });
  }
  openDialog(templateRef: TemplateRef<any>): void {
    const listDialogConfig = new MatDialogConfig();
    listDialogConfig.autoFocus = true;
    listDialogConfig.height = '450px';
    listDialogConfig.position = {
      top: '10vh',
    };
    let dialogRef = this.dialog.open(templateRef, listDialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedBook = undefined;
      this.editBook = 0;
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
