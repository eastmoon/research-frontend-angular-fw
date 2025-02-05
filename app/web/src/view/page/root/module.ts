import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PageComponent } from '.';
import { ForgroundLayer } from '@/view/layer/foreground';
import { ContentLayer } from '@/view/layer/content';


@NgModule({
  declarations: [
    PageComponent,
    ForgroundLayer,
    ContentLayer
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [PageComponent]
})
export class PageModule {}
