// Import Libraries
import MVC, { Progress } from "mvc-extended-framework";

// Declare function
function timeout(ms : number) : Promise<number> {
    return new Promise<number>(resolve => {
        setTimeout(resolve, ms)
    });
}
// Declare class
class Startup extends Progress {
    //
    constructor() {
        super();
        let f1 = {name: "1", exec: this.filter1.bind(this)};
        let f2 = {name: "2", exec: this.filter2.bind(this)};
        let f3 = {name: "3", exec: this.filter3.bind(this)};
        this.register(f1.name, f1);
        this.register(f2.name, f2);
        this.register(f3.name, f3);
    }
    //
    filter1($args: any) {
        console.log("Startup filter 1");
        return $args;
    }
    filter2($args: any) {
        console.log("Startup filter 2");
        return $args;
    }
    async filter3($args: any) {
        console.log("Startup filter 3 - delay 3s");
        await timeout(3000);
        console.log("Startup filter 3 - complete");
        return $args;
    }
}

// Declare instance object
if (!MVC.controller.has(Startup.name)) MVC.register(new Startup());
export default MVC.controller.retrieve(Startup.name);
