// Import Libraries
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouteInfoComponent } from './info';
import { RouteLazyComponent } from './lazy';

// Route layer configuration
@Component({
  selector: 'layer-content-route',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class RouteContentLayer {
  // 取得頁面中的 appDynamicLazyComponentHost 樣板參考 ( Template reference ) 的視圖容器參考 ( ViewContainerRef )
  @ViewChild('appDynamicLazyComponentHost', { read: ViewContainerRef }) dynamicLazyComponentLoader:ViewContainerRef | undefined;
  // Declare lifecycle hook
  ngOnInit(): void {}
}

// Route module configuration
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/info/0/demo', pathMatch: 'full' },
  { path: 'info/:id/:name', component: RouteInfoComponent },
  { path: 'lazy/:name', component: RouteLazyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
