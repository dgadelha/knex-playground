import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { AngularSplitModule } from "angular-split";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([{ path: "", pathMatch: "prefix", component: AppComponent }]),
    MonacoEditorModule,
    AngularSplitModule,
  ],
  declarations: [AppComponent, FooterComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
