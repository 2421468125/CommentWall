## 前端结构

📦fore-end
┣ 📂mock _模拟数据_
┃ ┗ 📜index.js
┣ 📂node*modules
┣ 📂public
┃ ┗ 📜favicon.ico
┣ 📂src
┃ ┣ 📂api *后端接口 api*
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂assets *存放图片、动图、图标、字体等*
┃ ┃ ┣ 📂anime
┃ ┃ ┃ ┗ 📜loading.json
┃ ┃ ┣ 📂fonts
┃ ┃ ┃ ┗ 📂icons
┃ ┃ ┣ 📂images
┃ ┣ 📂components *组件文件*
┃ ┃ ┣ 📂**tests**
┃ ┃ ┃ ┗ 📜HelloWorld.spec.ts
┃ ┃ ┣ 📜CardDetail.vue *卡片详情+查看评论*
┃ ┃ ┣ 📜CommentItem.vue *单条评论组件*
┃ ┃ ┣ 📜CommentModal.vue *写留言的组件*
┃ ┃ ┣ 📜ConfirmDialog.vue *弹出确定框组件*
┃ ┃ ┣ 📜FootBar.vue *尾页*
┃ ┃ ┣ 📜NodeCard.vue *单条留言卡组件*
┃ ┃ ┣ 📜TopBar.vue *顶部菜单*
┃ ┣ 📂router *路由，虽然没用到*
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂stores \_pinia 管理复用状态*
┃ ┃ ┣ 📜pageStore.ts
┃ ┃ ┗ 📜userId.ts
┃ ┣ 📂styles _公用样式_
┃ ┃ ┣ 📜commons.css
┃ ┃ ┣ 📜commons.min.css
┃ ┃ ┗ 📜commons.scss
┃ ┣ 📂utils
┃ ┃ ┣ 📜axios.ts _ajax_
┃ ┃ ┣ 📜data.ts _存放前端静态数据_
┃ ┃ ┣ 📜env.ts
┃ ┃ ┗ 📜utils.ts _公用函数_
┃ ┣ 📂views
┃ ┃ ┣ 📜CWIndex.vue _路由首页，但会自动跳转至 WallMessage，可以拓展注册等功能_
┃ ┃ ┗ 📜WallMessage.vue
┃ ┣ 📜App.vue
┃ ┗ 📜main.ts
┣ 📜env.d.ts
┣ 📜index.html
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜tsconfig.app.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┣ 📜tsconfig.vitest.json
┣ 📜vite.config.ts
┗ 📜vitest.config.ts

---

## 后端结构

📦server
┣ 📂config _配置文件_
┃ ┗ 📜default.js
┣ 📂controller _包装 mysql 函数调用_
┃ ┗ 📜dbServer.js
┣ 📂data
┣ 📂lib _mysql 函数调用_
┃ ┗ 📜db.js
┣ 📂log _存放 log_
┃ ┣ 📜httpRequest.log
┃ ┗ 📜mySQL.log
┣ 📂node*modules
┣ 📂routes *后端路由接口*
┃ ┗ 📜index.js
┣ 📂views *可以做后端管理等视窗\_
┃ ┣ 📜index.html
┃ ┗ 📜test.html
┣ 📜index.js
┣ 📜package-lock.json
┗ 📜package.json
