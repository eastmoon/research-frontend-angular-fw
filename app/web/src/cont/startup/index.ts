// Import Libraries
import MVC from "@/framework/pattern/facade/mvc";
import { Progress } from "@/framework/pattern/facade/progress";

// Declare class
class Startup extends Progress {}

// Declare instance object
if (!MVC.controller.has(Startup.name)) MVC.register(new Startup());
export default MVC.controller.retrieve(Startup.name);
