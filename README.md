# Comment Wall 留言墙项目

这是一个基于 Vue 3 和 Node.js 的留言墙项目，用户可以在墙上发布留言、评论和反馈。适合做新学习 Vue 与 Node 后端的练手小项目。
参考视频: [b 站 yike 陈](https://www.bilibili.com/video/BV1Qk4y1j7Tc/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click&vd_source=93510acc4e95ab3830c04930c258df47)

不过也不是完全按照他的项目写的，做了一些修改以及并不实现照片墙功能。

## 项目简介

Comment Wall 是一个允许用户发布留言、评论和反馈的应用。前端使用 Vue 3 和 PrimeVue，后端使用 Node.js 和 Express，并通过 MySQL 数据库存储数据。

---

## 项目结构

[structure.md](./structure.txt)

---

## 项目配置

首先先 clone 该项目：

```sh
git clone https://github.com/2421468125/CommentWall.git
```

### 前端设置

```sh
cd fore-end
npm install
```

### 后端设置

```sh
cd server
npm install

打开 server/config/default.js
修改
database: {
    HOST: 'localhost',
    USER: 'root', #默认root可以改
    PASSWORD: '123456', #修改为你用户的密码
    DATABASE: 'test', #修改为要使用的数据库，需注意要提前创建
}
```

如果没有安装 MySQL，可以点击 [链接]('https://www.mysql.com/cn/downloads/')去官网下载。

---

## 如何运行

确保你已经完成前面的配置

```sh
# 先启动后端
cd server
node index.js

# 启动前端
cd fore-end
npm run dev

浏览器打开 http://localhost:5174/ 即可
```

---

## 许可证

本项目使用 MIT 许可证。详情请参阅 [LICENSE](./LICENSE) 文件。
