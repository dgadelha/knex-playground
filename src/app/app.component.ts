import { Component, inject } from "@angular/core";
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
  standalone: false,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  host: {
    "window:keydown.control.shift.p": "onPrettify($event)",
    "window:keydown.shift.alt.f": "onPrettify($event)",
  },
})
export class AppComponent {
  client = knexClients[0];
  knex = Knex({ client: this.client.id });

  knexEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    language: "typescript",
    scrollBeyondLastLine: false,
    wordWrap: "on",
    theme: "vs-dark",
  };

  sqlEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    language: "sql",
    readOnly: true,
    scrollBeyondLastLine: false,
    wordWrap: "on",
    theme: "vs-dark",
  };

  code: string = `// Knex code\nknex("table").select()\n`;
  sql: string = `--- generated SQL code\nselect\n  *\nfrom\n  "table"\n`;

  isBelowMd = false;

  public state = inject(StateService);
  public responsiveService = inject(ResponsiveService);
  private _monacoService = inject(MonacoService);

  constructor() {
    this.state.state$.subscribe(state => {
      this.client = knexClients.find(client => client.id === state.client) ?? this.client;
      this.knex = Knex({ client: state.client });
      this.code = state.code;
      this.onCodeChange();
    });

    this.responsiveService.isBelowMd().subscribe(isBelowMd => {
      this.isBelowMd = isBelowMd.matches;
    });
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.focus();
  }

  getError(error: unknown): string {
    if (error instanceof Error) {
      return error.toString();
    }

    return String(error);
  }

  onCodeChange() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const knex = this.knex;

    try {
      let sql = "--- generated SQL code\n";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      let generatedCode: string = eval(this.code).toQuery();

      try {
        generatedCode = sqlFormatter.format(generatedCode, {
          language: this.client.formatter,
        });
      } catch (error) {
        sql += `--- sqlFormatter failed to run: ${this.getError(error)}\n`;
      }

      this.sql = sql + generatedCode + "\n";
    } catch (error) {
      this.sql = `--- ${this.getError(error)}\n`;
    }
  }

  onPrettify(event?: Event) {
    event?.preventDefault();
    this.code = js_beautify(this.code);
  }
}
