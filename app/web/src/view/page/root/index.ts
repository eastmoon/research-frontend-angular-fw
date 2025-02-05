import { Component } from '@angular/core';
import { APIService } from '@/model/service/api'

@Component({
  selector: 'page-root',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class PageComponent {
  title = 'Angular PureMVC framework';
  constructor(private apis: APIService) {
      if (!!apis) apis.op("msg", "demo hero");
  }
}
