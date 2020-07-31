import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Author } from '../author';
import { AuthorsList } from '../AuthorsList';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { __values } from 'tslib';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  entry: Author = {
    firstName: '',
    lastName: '',
    patronymic: '',
    dateOfBirth: new Date(),
  };

  myForm: FormGroup;
  selectedAuthor: Author;
  deletedAuthor: Author;
  editAuthor: number = 0;
  dataSource: MatTableDataSource<Author>;
  sortedData: Author[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.myForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [Date, [Validators.required]],
    });
   
    this.getAuthors();
    if (this.authors == null) {
      this.authors = AuthorsList;
    }
  }

  ngOnInit(): void {
  }

  setAuthorsAtLocalStorage() {
    localStorage.setItem('allAuthors', JSON.stringify(this.authors));
  }
  getAuthors(): void {
    this.authors = JSON.parse(localStorage.getItem('allAuthors'));
  }

 
  submit() {
    this.addAuthor();
  }
  addAuthor() {
    this.entry.firstName = this.myForm.controls['firstName'].value;
    this.entry.patronymic = this.myForm.controls['patronymic'].value;
    this.entry.lastName = this.myForm.controls['lastName'].value;
    this.entry.dateOfBirth = this.myForm.controls['dateOfBirth'].value;
    this.authors.push(this.entry);
    this.setAuthorsAtLocalStorage();
    this.getAuthors()
    this.myForm.reset(__values);
    this.dialog.closeAll();
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
  editSelectedAuthor() {
    this.editAuthor = 1;
  }
  saveEditedAuthor() {
    this.editAuthor = 0;
    this.setAuthorsAtLocalStorage();
    this.dialog.closeAll();
  }
  deleteAuthor() {
    if (this.authors.indexOf(this.selectedAuthor) > -1) {
      this.authors.splice(this.authors.indexOf(this.selectedAuthor), 1);
      this.setAuthorsAtLocalStorage();
      delete this.selectedAuthor;
      this.dialog.closeAll();
    }
  }
  sortData(sort: Sort) {
    const data = this.authors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = this.authors.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'patronymic':
          return compare(a.patronymic, b.patronymic, isAsc);
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
      this.selectedAuthor = undefined;
      this.editAuthor = 0;
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
