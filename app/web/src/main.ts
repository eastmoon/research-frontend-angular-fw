import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PageModule } from '@/view/page/root/module';
import MVC from "@/framework/pattern/facade/mvc";
import "@/cont/startup";
import "@/model/proxy/counter";
import "@/model/service/lazy";

console.log( MVC.instance );
platformBrowserDynamic().bootstrapModule(PageModule)
  .catch(err => console.error(err));
