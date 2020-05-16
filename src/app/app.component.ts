import { Component } from "@angular/core";
import * as Knex from "knex";
import sqlFormatter from "sql-formatter";
import { version as knexVersion } from "../../node_modules/knex/package.json";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  knex = Knex({ client: "pg" });

  knexEditorOptions = {
    language: "typescript",
  };

  sqlEditorOptions = {
    language: "sql",
    readOnly: true,
  };

  code: string = `// Knex ${knexVersion} code\nknex("table").select()\n`;
  sql: string = `--- generated SQL code\nselect\n  *\nfrom\n  "table"\n`;

  onCodeChange(newCode: string) {
    const knex = this.knex;

    try {
      this.sql = "--- generated SQL code\n" + sqlFormatter.format(eval(newCode).toQuery());
    } catch (err) {
      this.sql = `--- ${err?.toString() ?? err}`;
    }
  }
}
