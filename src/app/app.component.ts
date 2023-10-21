import { Component, HostListener } from "@angular/core";
import { MonacoStandaloneCodeEditor } from "@materia-ui/ngx-monaco-editor";
import { js_beautify } from "js-beautify";
import Knex from "knex";
import * as sqlFormatter from "sql-formatter";
import { knexClients } from "../helpers/clients";
import { MonacoService } from "./monaco.service";
import { ResponsiveService } from "./responsive.service";
import { StateService } from "./state.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  client = knexClients[0];
  knex = Knex({ client: this.client.id });

  knexEditorOptions = {
    language: "typescript",
    scrollBeyondLastLine: false,
    wordWrap: "on",
    theme: "vs-dark",
  };

  sqlEditorOptions = {
    language: "sql",
    readOnly: true,
    scrollBeyondLastLine: false,
    wordWrap: "on",
    theme: "vs-dark",
  };

  code: string = `// Knex code\nknex("table").select()\n`;
  sql: string = `--- generated SQL code\nselect\n  *\nfrom\n  "table"\n`;

  isBelowMd = false;

  constructor(
    private _monacoService: MonacoService,
    public state: StateService,
    responsiveService: ResponsiveService,
  ) {
    this.state.state$.subscribe(state => {
      this.client = knexClients.find(client => client.id === state.client) ?? this.client;
      this.knex = Knex({ client: state.client });
      this.code = state.code;
      this.onCodeChange();
    });

    responsiveService.isBelowMd().subscribe(isBelowMd => {
      this.isBelowMd = isBelowMd.matches;
    });
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.focus();
  }

  onCodeChange() {
    const knex = this.knex;

    try {
      let sql = "--- generated SQL code\n";
      let generatedCode = eval(this.code).toQuery();

      try {
        generatedCode = sqlFormatter.format(generatedCode, {
          language: this.client.formatter,
        });
      } catch (e) {
        sql += `--- sqlFormatter failed to run: ${e?.toString() ?? e}\n`;
      }

      this.sql = sql + generatedCode + "\n";
    } catch (err) {
      this.sql = `--- ${err?.toString() ?? err}\n`;
    }
  }

  @HostListener("window:keydown.control.shift.p", ["$event"])
  @HostListener("window:keydown.shift.alt.f", ["$event"])
  onPrettify(event?: KeyboardEvent) {
    event?.preventDefault();
    this.code = js_beautify(this.code);
  }
}
