import { Component, EventEmitter, Output } from "@angular/core";
import { knexClients } from "src/helpers/clients";
import knexInfo from "../../../node_modules/knex/package.json";
import { StateService } from "../state.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  knexClients = knexClients;
  knexVersion = knexInfo.version;

  client = knexClients[0].id;

  @Output()
  prettify: EventEmitter<void> = new EventEmitter<void>();

  constructor(public state: StateService) {
    this.state.state$.subscribe(state => {
      this.client = state.client;
    });
  }
}
