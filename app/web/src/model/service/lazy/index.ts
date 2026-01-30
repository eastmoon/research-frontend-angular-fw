import MVC, { Service } from "mvc-extended-framework";

class LazyComponentLoader extends Service {
    items : { [key : string] : any } = {
      "a": (c : any) => {import(`@/view/component/lazy-a`).then(({LazyAComponent}) => { if (!!c && typeof c === "function" ) c(LazyAComponent)})},
      "b": (c : any) => {import(`@/view/component/lazy-b`).then(({LazyBComponent}) => { if (!!c && typeof c === "function" ) c(LazyBComponent)})},
      "c": (c : any) => {import(`@/view/component/lazy-c`).then(({LazyCComponent}) => { if (!!c && typeof c === "function" ) c(LazyCComponent)})},
      "d": (c : any) => {import(`@/view/component/lazy-d`).then(({LazyDComponent}) => { if (!!c && typeof c === "function" ) c(LazyDComponent)})},
      "e": (c : any) => {import(`@/view/component/lazy-e`).then(({LazyEComponent}) => { if (!!c && typeof c === "function" ) c(LazyEComponent)})},
    }

    loader(info: any) {
        if (!!info && typeof info === "object") {
            let f : any;
            if ( !!info.name && typeof info.name === "string") f = this.items[info.name];
            if ( !!f && typeof f === "function" && !!info.call && typeof info.call === "function") {
                f((com : any) => { info.call(com) })
            }
        }
    }
}

// Declare instance object
if (!MVC.model.has(LazyComponentLoader.name)) MVC.register(new LazyComponentLoader());
export default MVC.model.retrieve(LazyComponentLoader.name);
