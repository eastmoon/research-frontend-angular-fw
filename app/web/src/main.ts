import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@/view/page/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
