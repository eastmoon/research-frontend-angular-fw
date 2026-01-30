// Import Libraries
import MVC, { Proxy } from "mvc-extended-framework";

// Declare class
export class Counter extends Proxy {}

// Declare instance object
if (!MVC.model.has(Counter.name)) MVC.register(new Counter());
export default MVC.model.retrieve(Counter.name);
