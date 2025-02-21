# Angular 前端框架研究

Angular 前端框架基於 MVC 架構概念設計設計，對於單頁應用程式專案提供了優異的開發方向，但考量基於 Angular 的網頁應用程式，仍需提升整體軟體架構的延展性 ( Extensibility ) 、維護性 ( Maintainability )。

## 開發運維框架

開發運維框架是提供 DevOps 在基礎架構即程式 ( Infrastructure as Code ) 設計概念下，將專案的開發、發佈歸納入專案管理的腳本下，確保轉移至任何開發環境都能基於相應的命令介面執行相應內容。

+ 開發模式 ```do dev```
    - 開發伺服器 ```do dev server```
    - 元件開發伺服器 ```do dev storybook```
        + 基於效率考量，該服務並未啟動對應容器的 HMR 機制
        + 若需要 HMR 建議使用 ```npm``` 方式啟動服務
    - 服務開發伺服器 ```do dev mocha```
    - 偽資料伺服器 ```do dev dummy```
+ 發佈模式 ```do pub```

由於開發運維框架是假設專案所屬環境無法提供專案開發、發佈所需的第三方工具，因此本項目會透過 Docker 容器封裝必要的環境，並啟動對應的服務；倘若環境可供專案執行，則可於 ```/app``` 目錄下執行以下指令來啟動服務：

+ 網頁專案 ```/app/web```
    - 安裝套件 ```npm install```
    - 開發伺服器 ```npm run start```
    - 元件開發伺服器 ```npm run storybook```
    - 服務開發伺服器 ```npm run mocha```
    - 專案發佈 ```npm run build```
+ 偽資料專案 ```/app/dummy```
    - 安裝套件 ```npm install```
    - 啟動伺服器 ```npm run start```

## Angular MVC extended 框架

基於 PrueMVC 架構概念配合 Angular 框架的擴展其 MVC 框架與規範，設計目的是考量 Angular 框架本質僅，在考量網頁的互動、結構、服務內容擴大到網頁應用程式，建議補充 MVC 框架作為輔助，將業務邏輯重新分門別類的管理。

詳細說明參考[Angular 專案文件](./app/web/doc/framework-design.md)
