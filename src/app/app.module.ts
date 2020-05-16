import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MonacoEditorModule, NgxMonacoEditorConfig } from "ngx-monaco-editor";

import { AppComponent } from "./app.component";

const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: {
    scrollBeyondLastLine: false,
    wordWrap: true,
    theme: "vs-dark",
  },

  async onMonacoLoad() {
    try {
      const typeRes = await fetch("/assets/knex/index.d.ts");
      const types = await typeRes.text();
      const mappedTypes = types.replace(/^import .*$/gm, "").replace("export = Knex;", "declare const knex: Knex;");

      monaco.languages.typescript.typescriptDefaults.addExtraLib(mappedTypes, "knex.d.ts");
    } catch {
      window.location.reload();
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
