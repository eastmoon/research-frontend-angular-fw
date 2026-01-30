import { Component } from '@angular/core';
import { EchoService } from '@/model/service/echo';
import MVC from "mvc-extended-framework";
import { PageComponentStore } from './store';

@Component({
  selector: 'page-root',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class PageComponent {
  // Declare member variable
  isShow = false;
  title = 'Angular PureMVC framework';
  // Declare class constructor
  constructor(private echo: EchoService, private store: PageComponentStore) {
      if (!!echo) echo.op("msg", "demo hero");
      let p : any = MVC.controller.retrieve("Startup");
      if ( !!p ) {
          p.attach("onComplete", this.startupComplete.bind(this));
      }
  }
  // Declare lifecycle hook
  ngOnInit(): void {
      MVC.exec("Startup", {});
  }
  startupComplete(notification : any) : void {
      this.isShow=true;
      this.store.start();
  }
}
