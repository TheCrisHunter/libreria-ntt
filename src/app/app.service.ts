import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
}
