import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  private booksUrl = "https://www.googleapis.com/books/v1/volumes";

  constructor(private http: HttpClient) {}

  public getBooks(searchTerm: string, startIndex?: number) {
    let paramsString =
      `q=intitle:` + searchTerm + `&printType=books&maxResults=20`;
    if (startIndex) {
      paramsString += `&startIndex=` + startIndex;
    }
    const params = new HttpParams({
      fromString: paramsString
    });
    return this.http.get<any[]>(this.booksUrl, {
      params: params
    });
  }

  public getBooksByGenre(genre: string, startIndex?: number) {
    let paramsString = `q=subject:` + genre + `&printType=books&maxResults=20`;
    if (startIndex) {
      paramsString += `&startIndex=` + startIndex;
    }
    const params = new HttpParams({
      fromString: paramsString
    });
    return this.http.get<any[]>(this.booksUrl, { params });
  }

  public getBooksAdvanced(filters: any, startIndex?: number) {
    let paramsString = '';

    if (filters.genre) {
      paramsString += `subject:${filters.genre}+`;
    }

    if (filters.startDate) {
      paramsString += `after:${filters.startDate}+`;
    }

    if (filters.endDate) {
      paramsString += `before:${filters.endDate}+`;
    }

    if (startIndex) {
      paramsString += `&startIndex=${startIndex}`;
    }

    const params = new HttpParams({ fromString: 'q=' + paramsString });
    
    return this.http.get<any[]>(this.booksUrl, { params });
  }
}
