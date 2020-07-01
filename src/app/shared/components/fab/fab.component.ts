import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fabAnimation } from './fab.animations';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  animations: fabAnimation
})
export class FabComponent implements OnInit {
  public fabOptions; 
  public optionArray = [];
  public fabTogglerState = 'inactive';

  @Input() options;
  @Output() func = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if (this.options) {
      this.fabOptions = this.options;
    }
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.optionArray = this.fabOptions;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.optionArray = [];
  }

  onToggleFab() {
    this.optionArray.length ? this.hideItems() : this.showItems();
  }

  itemFunction(event) {
    this.func.emit(event);
  }
}