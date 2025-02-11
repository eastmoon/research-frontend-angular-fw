// Import Libraries
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import MVC from "@/framework/pattern/facade/mvc";
import { IMediator, Mediator } from "@/framework/pattern/mediator";

@Component({
  selector: 'layer-content-main',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class MainContentLayer {
  // 取得頁面中的 appDynamicLazyComponentHost 樣板參考 ( Template reference ) 的視圖容器參考 ( ViewContainerRef )
  @ViewChild('appDynamicLazyComponentHost', { read: ViewContainerRef }) dynamicLazyComponentLoader:ViewContainerRef | undefined;
  // Declare lifecycle hook
  ngOnInit(): void {
    // Mediator configuration
    if (!MVC.view.has("Content")) MVC.register(new Mediator("Content"));
    let mediator : IMediator | null = MVC.view.retrieve("Content");
    if (!!mediator) {
      mediator.attachEvent("main", "display", this.display.bind(this));
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
