import { EventEmitter, inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatestWith } from "rxjs";
import { decodeFromUrl, encodeForUrl } from "../helpers/url";

interface State {
  client: string;
  code: string;
}

@Injectable({ providedIn: "root" })
export class StateService {
  stateSnapshot: State = {
    client: "pg",
    code: `// Knex code\nknex("table").select()\n`,
  };

  state$ = new EventEmitter<State>();

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.activatedRoute.queryParams
      .pipe(combineLatestWith(this.activatedRoute.fragment))
      .subscribe(([params, fragment]) => {
        this.stateSnapshot.client = String(params.c ?? this.stateSnapshot.client);
        this.stateSnapshot.code = fragment ? decodeFromUrl(fragment) : this.stateSnapshot.code;

        this.state$.emit(this.stateSnapshot);
      });
  }

  setState(state: Partial<State>) {
    void this.router.navigate([], {
      queryParams: {
        c: state.client ?? this.stateSnapshot.client,
      },
      queryParamsHandling: "merge",
      fragment: encodeForUrl(state.code ?? this.stateSnapshot.code),
    });
  }
}
