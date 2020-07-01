import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(public stateService: StateService) {}

  ngOnInit() {
  }

  get rightDrawer(): boolean {
    return this.stateService.rightDrawer;
  }

  get leftDrawer(): boolean {
    return this.stateService.leftDrawer;
  }

  get bottomDrawer(): boolean {
    return this.stateService.bottomDrawer;
  }
}
