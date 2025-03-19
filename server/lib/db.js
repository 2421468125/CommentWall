import mysql from "mysql"
import config from "../config/default.js"

const db = mysql.createConnection({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  connectionLimit: 10,
})

const buildDatabase = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql,values,(err,result)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}

const poolExecuteQuery = (sql, values) => {
  return new Promise((resolve, reject) =>{
    pool.getConnection((err, connection)=>{
      if(err){
        reject(err);
      }else{
        connection.query(sql,values, (err,result)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
          connection.release();
        })
      }
    })
  })
}

const createDbSQL = `CREATE DATABASE if not exists ${config.database.DATABASE} default charset utf8 collate utf8_general_ci;`;

const createWallsSQL = ` 
  CREATE TABLE if not exists walls(
    id INT NOT NULL AUTO_INCREMENT,
    type INT NOT NULL COMMENT '0:message,1:picture',
    message VARCHAR(1000) COMMENT '留言',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    userId VARCHAR(100) NOT NULL COMMENT '创建者ID',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    label INT NOT NULL COMMENT '标签',
    color INT COMMENT '颜色',
    imgurl VARCHAR(100) COMMENT '图片路径',
    PRIMARY KEY (id)
  );
`

const createFeedbackSQL = `
  CREATE TABLE if not exists feedbacks(
    id INT NOT NULL AUTO_INCREMENT,
    wallId INT NOT NULL COMMENT '留言墙id',
    userId VARCHAR(100) NOT NULL COMMENT '反馈者id',
    type INT NOT NULL COMMENT '0：喜欢 1：举报 2：撤销',
    moment VARCHAR(100) NOT NULL COMMENT '时间' ,
    PRIMARY KEY(id),
    FOREIGN KEY(wallId) REFERENCES walls(id)
  );
`

const createCommentSQL = `
  CREATE TABLE if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    wallId INT NOT NULL COMMENT '留言墙id',
    userId VARCHAR(100) NOT NULL COMMENT '评论者id',
    imgurl VARCHAR(100) COMMENT '头像路径',
    comment VARCHAR(1000) COMMENT '评论内容',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY(id),
    FOREIGN KEY(wallid) REFERENCES walls(id)
  );
`

const createDatabase = (db) => {
  return buildDatabase(db,[]);
}


const createTabel = (sql) =>{
  return buildDatabase(sql,[]);
}

async function create(){
  await createDatabase(createDbSQL);
  createTabel(createWallsSQL);
  createTabel(createFeedbackSQL);
  createTabel(createCommentSQL);
}

db.connect((err,result)=>{
  if(err) {
    console.log("SQL Connect Failed",err);
    return;
  }
  console.log("SQL Connect Successfully");
  create();
  console.log("Create successfully");
});


const _insertWall = (value) => {
  const _sql = "insert into walls set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?;";
  return poolExecuteQuery(_sql, value);
}

const _insertFeedback = (value) =>{
  const _sql = "insert into feedbacks set wallId=?,userId=?,type=?,moment=?;";
  return poolExecuteQuery(_sql, value);
}

const _insertComment = (value) =>{
  const _sql = "insert into comments set wallId=?,userId=?,imgurl=?,comment=?,name=?,moment=?;";
  return poolExecuteQuery(_sql, value);
}

const _deleteWall  = (id)=>{
  const _sql = `delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where a.id=?;`;
  return poolExecuteQuery(_sql,[id]);
}

const _deleteFeedback = (id)=>{
  const _sql = `delete from feedbacks where wallId=? and type=0`;
  return poolExecuteQuery(_sql,[id]);
}

const _deleteComment = (id)=>{
  const _sql = `delete from comments where wallId=?`;
  return poolExecuteQuery(_sql,[id]);
}


const _queryWallPage = (page,pagesize, type,label) =>{
  let _sql;
  const start = (page-1)*pagesize;
  if(label === -1){
    _sql =  `select * from walls where type=? order by id desc limit ?,?;`;
    return poolExecuteQuery(_sql,[type,start,pagesize]);
  }else{
    _sql =  `select * from walls where type=? and label=? order by id desc limit ?,?;`
    return poolExecuteQuery(_sql,[type,label,start,pagesize]);
  }
  
}

const _queryCommentPage = (page,pagesize,id) =>{
  const start = (page-1)*pagesize; 
  const _sql = `select * from comments where wallId=? order by id desc limit ?,?;`;
  return poolExecuteQuery(_sql,[id,start,pagesize]);
}

const _queryFeedbackCount = (id) =>{
  const _sql = `select type,count(*) as count from feedbacks where wallId=? group by type;`;
  return poolExecuteQuery(_sql,[id]);
}

const _queryCommentCount = (id) =>{
  const _sql = `select count(*) as count from comments where wallId=?;`
  return poolExecuteQuery(_sql,[id]);
}

//查询某userId是否对wallId有过点赞记录
const _queryIsLike = (wid, uid) =>{
  const _sql = `select count(*) as count from feedbacks where wallId=? and userId=? and type=0;`
  return poolExecuteQuery(_sql,[wid,uid]);
}

let dbManager = {
  _insertWall,
  _insertFeedback,
  _insertComment,
  _deleteWall,
  _deleteFeedback,
  _deleteComment,
  _queryWallPage,
  _queryCommentPage,
  _queryFeedbackCount,
  _queryCommentCount,
  _queryIsLike,
}
export default dbManager;