import { Component } from '@angular/core';
import { APIService } from '@/model/service/api';
import MVC from "@/framework/pattern/facade/mvc";
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
  constructor(private apis: APIService, private store: PageComponentStore) {
      if (!!apis) apis.op("msg", "demo hero");
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
