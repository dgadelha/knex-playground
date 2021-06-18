import { Injectable } from "@angular/core";
import { MonacoEditorLoaderService } from "@materia-ui/ngx-monaco-editor";
import { filter, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MonacoService {
  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1),
      )
      .subscribe(async () => {
        try {
          const typeRes = await (await fetch("./assets/knex/index.d.ts")).text();
          const mappedTypes = typeRes
            .replace(/^import .*$/gmu, "")
            .replace(/[^ ]export /gu, " ")
            .replace(
              "declare function knex<TRecord extends {} = any, TResult = unknown[]>(\n  config: Knex.Config | string\n): Knex<TRecord, TResult>;",
              "declare const knex: Knex.Client & (<TRecord extends {} = any, TResult = unknown[]>(config: Knex.Config | string) => Knex<TRecord, TResult>);",
            );

          monaco.languages.typescript.typescriptDefaults.addExtraLib(mappedTypes, "knex.d.ts");
        } catch {
          window.location.reload();
        }
      });
  }
}
