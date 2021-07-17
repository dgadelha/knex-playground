import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  @Input()
  knexVersion: string;

  @Input()
  client: string;

  @Output()
  clientChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  prettify: EventEmitter<void> = new EventEmitter<void>();

  clients = [
    { id: "mysql", name: "MySQL / MariaDB" },
    { id: "pg", name: "PostgreSQL" },
    { id: "redshift", name: "Amazon Redshift" },
    { id: "sqlite3", name: "SQLite3" },
    { id: "oracledb", name: "Oracle" },
    { id: "mssql", name: "MSSQL" },
  ];
}
