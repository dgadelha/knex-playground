import { Component, inject, output } from "@angular/core";
import knexInfo from "../../../node_modules/knex/package.json";
import { knexClients } from "../../helpers/clients";
import { StateService } from "../state.service";

@Component({
  selector: "app-footer",
  standalone: false,
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  knexClients = knexClients;
  knexVersion = knexInfo.version;

  client = knexClients[0].id;

  readonly prettify = output();
  public state = inject(StateService);

  constructor() {
    this.state.state$.subscribe(state => {
      this.client = state.client;
    });
  }
}
