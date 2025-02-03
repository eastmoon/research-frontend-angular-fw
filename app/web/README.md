# 應用程式基礎

Angular 是完美符合 [MVVM](https://zh.wikipedia.org/zh-tw/MVVM) 的軟體架構，當然實際設計有細微的差異，可以參考一下文獻說明其軟體架構概念：

+ [Introduction to Angular concepts](https://angular.tw/guide/architecture)
    - [What is Angular?: Architecture, Features, and Advantages](https://www.simplilearn.com/tutorials/angular-tutorial/what-is-angular)

![angular concnpt](https://angular.tw/generated/images/guide/architecture/overview2.png)

本篇基於下述文獻，對 Angular 應用程式專案、元件、介面、雙向繫結等技術進行基礎操作與說明。

+ [Create a new project](https://angular.io/tutorial/tour-of-heroes/toh-pt0)
    - [Transforming Data Using Pipes](https://angular.io/guide/pipes)
+ [The hero editor](https://angular.io/tutorial/tour-of-heroes/toh-pt1)
    - [NgModel](https://angular.io/api/forms/NgModel)
    - [Understanding binding](https://angular.io/guide/binding-overview)
        + [Two-way binding](https://angular.tw/guide/two-way-binding)
    - [Introduction to modules](https://angular.tw/guide/architecture-modules)
        + [What is an Angular Module?](https://angular-training-guide.rangle.io/modules/introduction)
        + [Angular 模組](https://jonny-huang.github.io/angular/training/06_angular_module/)
        + [Frequently-used modules](https://angular.tw/guide/frequent-les)
+ [Display a selection list](https://angular.io/tutorial/tour-of-heroes/toh-pt2)
    - [Structural directives](https://angular.tw/guide/structural-directives)
+ [Create a feature component](https://angular.io/tutorial/tour-of-heroes/toh-pt3)
    - [Property binding](https://angular.tw/guide/property-binding)

## 建立應用程式專案

+ 使用 NG 開發環境建立工作區
```
angular ng
```

+ 執行專案建立指令
```
ng new base --skip-git --skip-install --style=scss --interactive=false
```
> 由於不需要建立路由，因此移除 ```--routing```

+ 使用 DEV 開發環境執行專案並啟動開發伺服器
```
angular dev --repo=base
```

Angular CLI 運用於建立應用程式，而開發伺服器則是檢視修正內容的即時呈現，兩者會是需要同時啟動的服務；即使不使用 Docker 啟動開發容器，執行其他開發工具也會同時啟動多個命令視窗來檢閱。

## 建立元件

+ 使用 NG 開發環境建立工作區
```
angular ng
```

+ 執行專案建立指令
```
ng generate component heroes
```
> 使用 generate 必需在工作區 ( Workspace ) 目錄下

Angualr 遵循物件導向的設計概念，一切皆已元件構築，若觀察其應用程式結構，其應用程式進入點是在應用程式原始碼目錄 ( src ) 的 [main.ts](./src/main.ts)，其中引入 [AppModule](./src/app/app.modules.ts) 來建立應用程式模組，並以 [AppComponent](./src/app/app.component.ts) 為應用程式的進入元件。

+ main.ts 主要運途是提供 Angular 編譯的進入點，並確保編譯後的 ```index.html``` 能正確引用此進入點編譯與封裝後的 ```main.js```；此部分程式除非有特定繪製需求，否則並無需刻意調整。
+ app.module.ts 主要運途是建立 Angular 應用程式中的模組，模組的用途請參閱後續說明。
+ app.component.ts 主要運途是定義應用程式元件的內容。

而 Angular 完美體現 MVVM 的一點就是其元件結構：

+ View
    - ```<name>.component.html```，設定元件佈局
    - ```<name>.component.scss```，設定元件的樣式規劃
+ View-Model
    - ```<name>.componet.ts```，設定元件對 View 的資料與榜定資訊操作
+ Model
    - 透過模組提取必要的操作物件來取得所需的資訊與方法

## 建立介面

+ 使用 NG 開發環境建立工作區
```
angular ng
```

+ 執行專案建立指令
```
ng generate interface hero
```
> 使用 generate 必需在工作區 ( Workspace ) 目錄下

[介面 ( Interface )](https://www.tutorialsteacher.com/typescript/typescript-interface) 是 TypeScript  的一種資料結構，其用途是一種定義好資料結構的名稱、屬性、方法，確保物件具有符合預期的操作與資料；但想較於物件導向中用於宣告類別的實作介面，TypeScript 中的介面用法更相似抽象類別 ( Abstract Class ) 與結構 ( Struct )。

因此，在範例中可以看到藉由宣告介面，元件產生了一個基於介面為型態的資料元件，並以此來操作其內容。

## 雙向繫結

在軟體架構中，[MVVM](https://zh.wikipedia.org/zh-tw/MVVM) 與 [MVP](https://zh.wikipedia.org/zh-tw/Model-view-presenter) 的最大差異在於繫結 ( Binding ) 機制；同樣作為 View 與 Model [中介資料 ( Metadata )](https://zh.wikipedia.org/zh-tw/%E5%85%83%E6%95%B0%E6%8D%AE)，兩者都有著將 Model 取得的資料進行過濾與整理後供給 View 與將 View 的介面操作暫存保留的用途，但對於回饋給 View 的機制兩者並不相同，其中 MVP 則是以行為完成一次更新的機制運行，React 便是基於此框架，而 MVVM 則是基於繫結讓變數異動直接回饋做局部變更，Angular 便是基於此框架。

![binding concept](https://angular.tw/generated/images/guide/architecture/databinding.png)

在 Angular 中，繫結分為 Property 與 Event 兩類，其差異如下：

+ Property 是指 View 從 Compoent 取得資料並對應到 [Property](https://angular.tw/guide/property-binding)、[Attribute](https://angular.tw/guide/attribute-binding)、[Style](https://angular.tw/guide/class-binding)，使用符號 ```[]```。
```
<img alt="item" [src]="itemImageUrl">
```
+ [Event](https://angular.tw/guide/event-binding) 是指 View 觸發 Component 的行為，使用符號為 ```()```。
```
<button (click)="onSave()">Save</button>
```

而 MVVM 中提到的[雙向繫結 ( two-way binding ) ](https://angular.tw/guide/two-way-binding)則是指同時使用兩種符號的用法。
```
<app-sizer [(size)]="fontSizePx"></app-sizer>
```

需要注意，Property 繫結對 ```[]``` 內的內容主要是對應 HTHML、CSS 在元素 ( Element ) 操作時的名詞，但用語上會存在框架內轉換的用法，句型還需額外注意；此外，由於元件在整合後等同於新的元素，亦符合繫結原則，因此也可透過此方式讓元件間傳遞訊息。

## 模組

在引用雙向繫結的範例中，會碰到一個錯誤狀況。

```
<input id="name" [(ngModel)]="hero.name" placeholder="name">
```

當使用 [ngModel](https://angular.io/api/forms/NgModel) 此模組時，input 元素並不認識他，這主要原因是應用程式並不認識保管 ngModel 的 [FormsModule](https://angular.io/api/forms/FormsModule)。

**In Angular, a module is a mechanism to group components, directives, pipes and services that are related, in such a way that can be combined with other modules to create an application.** - From [What is an Angular Module?](https://angular-training-guide.rangle.io/modules/introduction)

Angular 應用程式啟動時便會運用第一個模組 AppModule，而所謂模組便是整合諸如元件、指另、服務等所有 Angular 框架類別的整合物件，其設計與 [PureMVC](https://puremvc.org/) 的 Facade 相同，其目的是提供一個應用程式服務、元件提取的介面，另框架中的各物件能正確從此處取得目標內容。

而 Angular 透過模組的設計，將各種功能與服務分離成多種模組，並投過相依注入 ( Dependency Injection ) 原則讓需要使用的模組自 AppModule 中匯入，其中常用但也並非絕對需要的模組可以參考文獻 [Frequently-used modules](https://angular.tw/guide/frequent-ngmodules)，NgModule 使用原則參考 [NgModule 常見問題解答](https://angular.tw/guide/ngmodule-faq)。

# Angular operation document

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
