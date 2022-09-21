import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { AngularSplitModule } from "angular-split";

import { AppComponent } from "./app.component";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule,
    AngularSplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
