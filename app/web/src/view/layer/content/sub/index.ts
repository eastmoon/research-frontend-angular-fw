import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import MVC, { IMediator, Mediator } from "mvc-extended-framework";
import { SubContentStore } from './store';

@Component({
  selector: 'layer-content-sub',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class SubContentLayer {
    // 取得頁面中的 appDynamicLazyComponentHost 樣板參考 ( Template reference ) 的視圖容器參考 ( ViewContainerRef )
    @ViewChild('appDynamicLazyComponentHost', { read: ViewContainerRef }) dynamicLazyComponentLoader:ViewContainerRef | undefined;
    // Constructor with component store object
    constructor(private store: SubContentStore) {
        store.start();
    }
    // Declare lifecycle hook
    ngOnInit(): void {
      // Mediator configuration
      if (!MVC.view.has("Content")) MVC.register(new Mediator("Content"));
      let mediator : IMediator | null = MVC.view.retrieve("Content");
      if (!!mediator) {
        mediator.attachEvent("sub", "display", this.display.bind(this));
      }
    }
    // 對視圖容器參考設定要建立的元件
    display(component: any) {
      if ( this.dynamicLazyComponentLoader !== undefined ) {
        this.dynamicLazyComponentLoader.clear();
        this.dynamicLazyComponentLoader.createComponent(component);
      }
    }
}
