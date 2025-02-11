# View

[Model View Controller](https://www.geeksforgeeks.org/mvc-design-pattern/) 中的視圖 ( View ) 是指 **『視圖 ( View ) 是用來呈現自模型 ( Model ) 取得的資料，並依據使用者操作結果交由制器更新模型與自身。』**，原則上視圖不與模型溝通，但會自控制器、模型取得更新資料的訊號。

視圖無論在 [MVC](https://www.geeksforgeeks.org/mvc-design-pattern/)、[MVP](https://www.geeksforgeeks.org/mvp-model-view-presenter-architecture-pattern-in-android-with-example/)、[MVVM](https://www.geeksforgeeks.org/introduction-to-model-view-view-model-mvvm/) 的架構概念中，本身都不應具有實際資料，僅有互動邏輯；因此，在 MVP、MVVM 演化成將互動邏輯與參數、最終呈現資料儲存於 Presenter、ViweModel，在 React 社群中更有狀態服務 [redux](https://redux.js.org/)、[zustand](https://zustand-demo.pmnd.rs/) 來替代 Presenter 的存在。

然而，在 PureMVC 框架時做中，Presenter 由 Mediator 替代，但設計規範在本質上並無不同；然而，考量 MVP、MVVM 在單頁應用程式用於視圖的設計運用，還是將其作出區別。

視圖設計中介者 ( Mediator ) 時機規範如下：

+ 中介者會管理複數個視圖
+ 中介者會透過指定對特定模塊、元件的事件執行
+ 中介者會透過通告廣播給事件給所有偵聽的模塊、元件
+ 中介者被觸發執行範圍無法規範，例如可能是存在於頁面的元件、後端取回的訊息自動觸發等

原則上 Presenter 與 Mediator 差別在於負責模塊與元件的數量；若視圖的事件僅屬於自身的邏輯處理、資料整理，應該使用 Presenter；若視圖的事件來自於系統其它視圖、控制器、模型，應該使用 Mediator。

## 繼承 MVC 框架

```js
import MVC from "@/framework/pattern/facade/mvc";
import { Mediator } from "@/framework/pattern/mediator";
if (!MVC.view.has("Content")) MVC.register(new Mediator("Content"));
```
Mediator 本身具有對視圖廣播通知與指定視圖操作兩個功能，除非有撰寫行為進行操作的需要，否則並無需建立類別，直接生成物件後註冊即可。

## 主動註冊

藉由 MVC 框架的唯一特性與重名不可註冊特性，確保僅會有一個實體的中介者存在，並永遠回傳相同的物件。

```js
let instance : Mediator = MVC.view.retrieve("Content");
export default instance;
```

## 元件掛載處理函數

如前述設計原則，Mediator 設計適用於跨度整個系統的操作，倘若考量視圖元件的獨立性，實務上適合的視圖設計與事件為：

+ 視圖設計
    - 頁面 ( Page )
    - 圖層 ( Layer )
+ 視圖事件
    - 聚焦 ( onfocus )
    - 失焦 ( unfocus )
    - 顯示 ( display )
    - 消失 ( disapper )
    - 更新 ( update )

基於 Angular 元件更新機制，可設置相應的處理函數並於函數更新相應綁定變數，在將處理如下註冊後執行。

```js
// import store
import { IMediator, Mediator } from "@/framework/pattern/mediator";
// Attach function into mediator
let mediator : IMediator | null = MVC.view.retrieve("Content");
mediator.attachEvent("main", "display", this.display.bind(this));
// Call event
ContentMediator.on("main", "onfocus");
```

需要注意，由於 Angular 的類別掛入函數若未使用 ```bind```，函數執行時會處在 Scope 問題而無法使用 ```this```。

倘若經由 MVC 框架對註冊的元件發送事件，則會如下執行。

```js
// import MVC framework
import MVC from "@/framework/pattern/facade/mvc";
// Call event
MVC.on("Content", "main", "onfocus");
```

在本項目中設計範本如下：

+ [Foreground](./layer/foreground/index.ts)
    - Foreground 的事件由 [Root page state](./page/root/store.ts) 觸發
+ Content
    - [main](./layer/content/main/index.ts)、[sub](./layer/content/sub/index.ts) 各自對 Content Mediator 掛載事件
    - 由 [Sub content layer state](./layer/content/sub/store.ts) 發動延遲載入元件函數，並將動態載入的元件經過 Mediator 傳給 main、sub 繪製

## 元件狀態

在回應式應用程式 ( Reactive Applications ) 會設計一個狀態物件，並藉由此物件將狀態與行為自視圖分離，在 MVP 架構中的 Presenter，在 Angular 的實務中 Component 類別本身，然而 Component 類別本身還會包括如生命週期的處理行為，若要多個元件共享，則會建立物件額外管理，此物件易被稱為元件狀態 ( State )。

在 Angular 中可利用 [Ngrx](https://ngrx.io/docs) 建立符合 Redux 單向流的狀態物件，亦可注入一個服務做為狀態物件，在本項目中設計狀態範本如下：

+ [Root page state](./page/root/store.ts)
+ [Sub content layer state](./layer/content/sub/store.ts)

## 啟動流程

常見的畫面設計，當開啟頁面會依據一下流程完成頁面：

1. 載入 HTML、JS、CSS
2. 繪製 Page 元件
3. 執行啟動程序
4. 繪製內容

在整個流程中，第一步為瀏覽器自身動作，第二步為 Angular 的 CSR 步驟，第三步為 Angular 元件的 onInit 生命週期觸發，第四步則需依據流程完成事件來決定時間；因此，在第三、第四步間的啟動流程，即可使用 Progress 建構啟動流程，從而依據不同頁面與進入狀態改變要執行的流程，並於流程完成時觸發事件來執行第四步。

在本項目中設計範本如下：

+ [Page 元件生命週期](./page/root/index.ts)
+ [啟動流程](../cont/startup/index.ts)

## 路由載入

Angular 路由的設計是藉由 Route 類別與設定繪製元件，然而，若依據路由文獻的設計，可繪製的內容若要基於路由內容、動態載入函數，以及未來載入內容插件化，則無法基於文獻的設計方式。

對此，藉由 PureMVC 架構，若要完成前述內容，則實際設計範本如下：

+ 基於 Angular route 建構基礎元件 [Route content layer](./layer/content/route/index.ts)
    - route 預設載入可動態載入元件的 [lazy](./layer/content/route/lazy/index.ts) 元件
+ lazy 元件基於 route 的資訊，透過 MVC 呼叫[延遲載入元件服務](../model/service/lazy/index.ts)
+ 藉由回呼結構，讓載入的元件交給動態繪製函數來繪製元件

 在實務設計上，也可依據資訊顯示將載入的元件經由 Mediator 廣撥給其他偵聽對象繪製元件。
