import Mock from "mockjs"

// 留言
const note = Mock.mock({
  "data|20":[{
    "moment": new Date(),
    "id|+1": 1,
    "userId|+1": 10,
    "message|24-96":"@cword",
    "label|0-10":0,
    "name":"@cname",
    "like|0-9999":0,
    "color|0-10":0,
    "comment|0-120":0,
    "imgurl|0-4":0, // background-color
    "revoke|0-20":0,
    "report|0-20":0,
  }]
});

export {note};