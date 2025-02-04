// Import Libraries
import MVC from "@/framework/pattern/facade/mvc";
import { Proxy } from "@/framework/pattern/proxy";

// Declare class
export class Counter extends Proxy {}

// Declare instance object
console.log(Counter);
if (!MVC.model.has("Counter")) MVC.register(new Counter());
export default MVC.model.retrieve("Counter");
