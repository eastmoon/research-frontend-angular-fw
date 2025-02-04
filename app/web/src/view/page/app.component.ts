import { Component } from '@angular/core';
import { APIService } from '@/model/service/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private apis: APIService) {
      if (!!apis) apis.op("msg", "demo hero");
  }
}
