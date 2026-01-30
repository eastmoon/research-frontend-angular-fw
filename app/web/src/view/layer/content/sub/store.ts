import { Injectable } from '@angular/core';
import MVC, { IMediator, Mediator } from "mvc-extended-framework";

@Injectable({
  providedIn: 'root'
})
export class SubContentStore {
  // 宣告動態匯入繪製元件所需變數與匯入函數列表
  intervalID: number|undefined;
  currentLazyItemIndex: number = -1;
  lazyItems = [
    () => {import(`@/view/component/lazy-a`).then(({LazyAComponent}) => {
      MVC.on("Content", "main", "display", LazyAComponent);
    })},
    () => {import(`@/view/component/lazy-b`).then(({LazyBComponent}) => {
      let mediator : IMediator | null = MVC.view.retrieve("Content");
      if (!!mediator) {
        mediator.notify("display", LazyBComponent);
      }
    })},
    () => {import(`@/view/component/lazy-c`).then(({LazyCComponent}) => {
      MVC.on("Content", "sub", "display", LazyCComponent);
    })},
  ]

  constructor() {}

  start(): void {
      // 啟動定時器，以此觸發切換動態匯入函數，並於匯入後繪製元件
      this.intervalID = setInterval(() => {
        this.currentLazyItemIndex = (this.currentLazyItemIndex + 1) % this.lazyItems.length;
        this.lazyItems[this.currentLazyItemIndex]();
      }, 2000);
  }
}
