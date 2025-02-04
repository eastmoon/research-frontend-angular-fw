import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@/view/page/app.module';
import MVC from "@/framework/pattern/facade/mvc";
import "@/cont/startup";
import "@/cont/navigate";
import "@/model/proxy/counter";

console.log( MVC.instance );
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
