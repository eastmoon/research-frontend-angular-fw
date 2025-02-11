import { Component } from '@angular/core';
import MVC from "@/framework/pattern/facade/mvc";
import { IMediator, Mediator } from "@/framework/pattern/mediator";

@Component({
  selector: 'layer-foreground',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class ForgroundLayer {
  // Declare member variable
  isShow=false;
  colorCode="gray";
  // Declare class constructor
  constructor() {
    // Mediator configuration
    if (!MVC.view.has("Foreground")) MVC.register(new Mediator("Foreground"));
    let mediator : IMediator | null = MVC.view.retrieve("Foreground");
    if (!!mediator) {
      mediator.attachEvent("main", "display", this.display.bind(this));
      mediator.attachEvent("main", "disapper", this.disapper.bind(this));
      mediator.attachEvent("main", "onfocus", this.onfocus.bind(this));
      mediator.attachEvent("main", "unfocus", this.unfocus.bind(this));
    }
  }
  // Declare mediator event
  display() {
    this.isShow=true;
    this.onfocus();
  }
  disapper() {
    this.isShow=false;
  }
  onfocus() {
    this.colorCode="black";
  }
  unfocus() {
    this.colorCode="gray";
  }
}
