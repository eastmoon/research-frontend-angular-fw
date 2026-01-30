// Import Libraries
import MVC, { Service } from "mvc-extended-framework";
import { Injectable } from '@angular/core';

// Declare class
@Injectable({
  providedIn: 'root'
})
export class EchoService extends Service {
    constructor() {
        super();
        if (!MVC.model.has(this.name)) MVC.register(this);
    }

    msg(message: string) {
        console.log(`---${message}---`)
    }
}
