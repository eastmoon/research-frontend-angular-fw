import { Injectable } from '@angular/core';
import MVC from "mvc-extended-framework";

@Injectable({
  providedIn: 'root'
})
export class PageComponentStore {
  // 宣告動態匯入繪製元件所需變數與匯入函數列表
  intervalID: number|undefined;
  count = 0;

  constructor() {}

  start(): void {
    // 啟動定時器，以此觸發前景層的狀態
    this.intervalID = setInterval(() => {
        if (this.count % 2) {
            MVC.on("Foreground", "main", "display");
        } else if ( this.count % 3 ) {
            MVC.on("Foreground", "main", "unfocus");
        } else {
            MVC.on("Foreground", "main", "disapper");
        }
        this.count++;
    }, 2000);
  }
}
