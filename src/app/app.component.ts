import { Component } from "@angular/core";
import Knex from "knex";
import * as sqlFormatter from "sql-formatter";
import { version as knexVersion } from "../../node_modules/knex/package.json";
import { MonacoService } from "./monaco.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  client = "pg";

  knex = Knex({ client: this.client });
  knexVersion = knexVersion;

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

  constructor(private monacoService: MonacoService) {}

  onCodeChange(newCode: string) {
    const knex = this.knex;

    try {
      this.sql = "--- generated SQL code\n" + sqlFormatter.format(eval(newCode).toQuery()) + "\n";
    } catch (err) {
      this.sql = `--- ${err?.toString() ?? err}\n`;
    }
  }

  onClientChange(client: string) {
    this.knex = Knex({ client });
    this.onCodeChange(this.code);
  }
}
