// 定义接口环境

let baseUrl: string = "";
const routerMode: string = "hash";
let baseImgPath: string = "";

if (process.env.NODE_ENV === "developement") {
  baseUrl = "http://localhost:3000";
  baseImgPath = "http://localhost:3000";
} else {
  console.log("not in development mode");
  baseUrl = "http://localhost:3000";
  baseImgPath = "http://localhost:3000";
}

export { baseUrl, baseImgPath };
