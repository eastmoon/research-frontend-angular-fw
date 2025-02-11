import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PageComponent } from '.';
import { ForgroundLayer } from '@/view/layer/foreground';
import { MainContentLayer } from '@/view/layer/content/main';
import { SubContentLayer } from '@/view/layer/content/sub';
import { RouteContentLayer, RoutingModule } from '@/view/layer/content/route';


@NgModule({
  declarations: [
    PageComponent,
    ForgroundLayer,
    MainContentLayer,
    SubContentLayer,
    RouteContentLayer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [PageComponent]
})
export class PageModule {}
