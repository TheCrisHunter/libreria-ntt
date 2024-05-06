import { Component, HostListener, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, filter, switchMap } from "rxjs/operators";
import { AppService } from "./app.service";
import { Book } from "./book";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = "";
  private startIndex: number = 0;
  private searchTermChanged = new Subject<void>();
  showAdvancedFilters: boolean = false;
  startDate: string = '';
  endDate: string = '';

  //Dejo los generos en ingles ya que google no los detecta en español!!!!
  genres: string[] = [
    'Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Adventure',
    'Horror',
    'Thriller',
    'Biography',
    'Humor'
  ];
  selectedGenre: string = '';
  search : boolean = false;

  @HostListener("window:scroll", ["$event"])
  onEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.startIndex += 20;
      this.appService
        .getBooks(this.searchTerm, this.startIndex)
        .subscribe((response : any) => {
          this.books = this.books.concat(response.items);
        });
    }
  }

  constructor(private appService: AppService) {}

  public ngOnInit() {
    this.searchTermChanged
      .pipe(
        filter(() => this.searchTerm !== ""),
        debounceTime(500),
        switchMap(() => this.appService.getBooks(this.searchTerm))
      )
      .subscribe((response: any) => {
        this.books = response.items;
      });
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  applyAdvancedFilters() {
    if (this.showAdvancedFilters) {
      let paramsString = '';
      
      if (this.selectedGenre) {
        paramsString += `subject:${this.selectedGenre}+`;
      }
      
      if (this.startDate) {
        paramsString += `after:${this.startDate}+`;
      }
      
      if (this.endDate) {
        paramsString += `before:${this.endDate}+`;
      }
  
      if (paramsString !== '') {
        paramsString = 'q=' + paramsString + '&maxResults=20';
        
        this.appService.getBooks(paramsString)
        .subscribe((response: any) => {
          this.books = response.items;
        });
      }
    }
  }

  public onSearchTermChange(searchTerm: string) {
    this.startIndex = 0;
    this.searchTerm = searchTerm;
    this.searchTermChanged.next();
  }

  searchBooksByGenre() {
    if (this.selectedGenre) {
      this.appService.getBooksByGenre(this.selectedGenre)
      
      .subscribe((response: any) => {
        this.books = response.items;
      });
    }
  }

  buscar(){
    this.search = true;
  }
}
