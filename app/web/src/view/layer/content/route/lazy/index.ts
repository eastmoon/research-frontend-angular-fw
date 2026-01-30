import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import MVC from "mvc-extended-framework";

@Component({
  selector: 'lazy',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class RouteLazyComponent {
  // 取得頁面中的 appDynamicLazyComponentHost 樣板參考 ( Template reference ) 的視圖容器參考 ( ViewContainerRef )
  @ViewChild('appDynamicLazyComponentHost', { read: ViewContainerRef }) dynamicLazyComponentLoader:ViewContainerRef | undefined;
  // Declare member variable
  name : string = "demo";
  // Declare class constructor
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    let val : any;
    val = this.route.snapshot.paramMap.get('name');
    if ( !!val ) this.name = val;
    if ( MVC.model.has("LazyComponentLoader")) {
        MVC.op("LazyComponentLoader", "loader", { name: this.name, call: this.display.bind(this) });
    }
  }

  goBack(): void {
    this.location.back();
  }

  // 對視圖容器參考設定要建立的元件
  display(component: any) {
    console.log(component)
    if ( this.dynamicLazyComponentLoader !== undefined ) {
      this.dynamicLazyComponentLoader.clear();
      this.dynamicLazyComponentLoader.createComponent(component);
    }
  }
}
