import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { HttpClientModule } from "@angular/common/http";
import { BookComponent } from "./book/book.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, MatIconModule],
  declarations: [AppComponent, BookComponent],
  bootstrap: [AppComponent],
  providers: [AppService]
})
export class AppModule {}
//