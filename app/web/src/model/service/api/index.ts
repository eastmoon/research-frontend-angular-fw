// Import Libraries
import MVC, { Service } from "mvc-extended-framework";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Declare class
@Injectable({
  providedIn: 'root'
})
export class APIService extends Service {
    constructor(private http: HttpClient) {
        super();
        if (!MVC.model.has(this.name)) MVC.register(this);
    }

    override op($name : string, $args?: any) : any {
        let info : any = super.op($name, $args);
        if ( info !== null ) {
            console.log(!!info.method);
        } else {
            throw new TypeError(`${this.name} can't find operator.`);
        }
    }
}
