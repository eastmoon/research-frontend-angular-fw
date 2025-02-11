import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'info',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class RouteInfoComponent {
  // Declare member variable
  id : number = 1;
  name : string = "jacky";
  // Declare class constructor
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    let val : any;
    val = this.route.snapshot.paramMap.get('id');
    if ( !!val ) this.id = Number(val);
    val = this.route.snapshot.paramMap.get('name');
    if ( !!val ) this.name = val;
  }

  goBack(): void {
    this.location.back();
  }
}
