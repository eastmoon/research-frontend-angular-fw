// Import Libraries
import MVC from "@/framework/pattern/facade/mvc";
import { Service } from "@/framework/pattern/proxy";
import { Injectable } from '@angular/core';

// Declare class
@Injectable({
  providedIn: 'root'
})
export class APIService extends Service {
    constructor() {
        super();
        if (!MVC.model.has(this.name)) MVC.register(this);
    }

    msg(message: string) {
        console.log(`---${message}---`)
    }
}
