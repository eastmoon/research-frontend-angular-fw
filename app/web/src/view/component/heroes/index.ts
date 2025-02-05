import { Component } from '@angular/core';
import { Hero } from '@/model/type/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class HeroesComponent {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
