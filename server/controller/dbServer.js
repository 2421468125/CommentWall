import dbManager from "../lib/db.js"
import winston from "winston"

const logger = winston.createLogger({
  level:'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level:'info',
      dirname:'log',
      filename:'mySQL.log',
    }),
  ]
});



async function useManager(operation, res, ...args) {
  try {
    logger.info(`operation: ${operation.name}
                 parameters: ${args}`);
    const result = await operation(...args);
    res.send({
      code: 200,
      message: result,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({
      code: 500,
      message: error.message,
    });
  }
}


const insertWall = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._insertWall,res,
    [data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl]);
};

const insertFeedback = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._insertFeedback,res,
      [data.wallId, data.userId, data.type, data.moment]);

};

const insertComment = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._insertComment,res,
    [data.wallId, data.userId, data.imgurl,data.comment, data.name, data.moment]);
};

const deleteWall = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._deleteWall,res,data.wallId);

};

const deleteFeedback = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._deleteFeedback,res,data.wallId);
};

const deleteComment = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._deleteComment,res,data.wallId);
};

const queryWallPage = async(req, res) => {
  let data = req.body;
  logger.info(`operation: queryWallPage 
               parameter: ${data.page},${data.pagesize},${data.type},${data.label},${data.userId}`);
  await dbManager._queryWallPage(data.page,data.pagesize,data.type,data.label)
    .then(async result=>{
      for(let i=0;i<result.length;i++){
        const feedbackCounts = await dbManager._queryFeedbackCount(result[i].id);
        result[i].like = result[i].report = result[i].invoke = 0;
        feedbackCounts.forEach(feedback => {
          if(feedback.type === 0) result[i].like = feedback.count;
          else if(feedback.type === 1) result[i].report = feedback.count;
          else result[i].invoke = feedback.count;  
        });
        result[i].isLike = await dbManager._queryIsLike(result[i].id,data.userId);
        result[i].commentCount = await dbManager._queryCommentCount(result[i].id);
        result[i].isLike = result[i].isLike[0].count > 0 ? 1 : 0;
        result[i].commentCount = result[i].commentCount[0].count;
      }
      res.send({
        code: 200,
        message: result,
      })
    }).catch(error =>{
      logger.error(error.message);
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    });
};

const queryCommentPage = async(req, res) => {
  let data = req.body;
  await useManager(dbManager._queryCommentPage,res,data.page,data.pagesize,data.wallId);
}

const controller = {
  insertWall,
  insertFeedback,
  insertComment,
  deleteWall,
  deleteFeedback,
  deleteComment,
  queryWallPage,
  queryCommentPage,
}

export default controller;