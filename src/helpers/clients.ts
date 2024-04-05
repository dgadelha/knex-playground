import type { SqlLanguage } from "sql-formatter";

export type KnexClient = { id: string; name: string; formatter: SqlLanguage };

export const knexClients: KnexClient[] = [
  { id: "pg", name: "PostgreSQL", formatter: "postgresql" },
  { id: "mysql", name: "MySQL / MariaDB", formatter: "mysql" },
  { id: "cockroachdb", name: "CockroachDB", formatter: "postgresql" },
  { id: "redshift", name: "Amazon Redshift", formatter: "redshift" },
  { id: "sqlite3", name: "SQLite3", formatter: "sqlite" },
  { id: "oracledb", name: "Oracle", formatter: "plsql" },
  { id: "mssql", name: "MSSQL", formatter: "tsql" },
];
