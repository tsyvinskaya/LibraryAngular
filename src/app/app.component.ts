import { Component, TemplateRef, ViewChild, OnInit} from '@angular/core';
import { AuthorsComponent } from '../app/authors/authors.component';
import { GenresService } from '../app/genres.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Library Angular';

  public AuthorsComponent: AuthorsComponent;
  public genreName: string = ""
  public genres: string[];
  

  constructor(public dialog: MatDialog, public genresService: GenresService) {
    this.genresService.getGenres().subscribe((genres) => (this.genres = genres));;
    
  }
  @ViewChild('intro', { static: true }) intro: TemplateRef<any>;

  ngOnInit(): void {this.openintroDialog(this.intro);}

  


  addGenre() {
    if (this.genreName.length !==0){
    this.genresService.setGenre(
      this.genreName);
    this.genreName = "";}
  }

  openDialog(templateRef: TemplateRef<any>): void {
    const listDialogConfig = new MatDialogConfig();
    listDialogConfig.autoFocus = true;
    listDialogConfig.height = '450px'
    listDialogConfig.width = '400px';
    listDialogConfig.position = {
      top: '10vh',
    };
    let dialogRef = this.dialog.open(templateRef, listDialogConfig);
  }

  openintroDialog(templateRef: TemplateRef<any>): void {
    const listDialogConfig = new MatDialogConfig();
    listDialogConfig.autoFocus = true;
    listDialogConfig.height = '450px'
    listDialogConfig.width = '700px';
    listDialogConfig.position = {
      top: '10vh',
    };
    let dialogRef = this.dialog.open(templateRef, listDialogConfig);
  }
  

  delete(genre) {
    if (this.genres.indexOf(genre) > -1) {
      this.genres.splice(this.genres.indexOf(genre), 1);
    }
  }

 

}


