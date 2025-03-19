import controller from "../controller/dbServer.js"

const route = function(app){
  app.get('/test',(req,res)=>{
    res.type('html');
    res.render('test');
  });

  app.post('/insertwall',(req, res)=> {
    controller.insertWall(req, res);
  })

  app.post('/insertfeedback',(req, res)=>{
    controller.insertFeedback(req,res);
  })

  app.post('/insertcomment',(req,res)=>{
    controller.insertComment(req,res);
  })

  app.post('/deletewall',(req,res)=>{
    controller.deleteWall(req,res);
  })

  app.post('/deletefeedback',(req,res)=>{
    controller.deleteFeedback(req,res);
  })

  app.post('/deletecomment',(req,res)=>{
    controller.deleteComment(req,res);
  })

  app.post('/querywallpage',(req,res)=>{
    controller.queryWallPage(req,res);
  })

  app.post('/querycommentpage',(req,res)=>{
    controller.queryCommentPage(req,res);
  })

  app.post('/signip',(req,res)=>{
    const ip = req.ip;
    res.send({
      code:200,
      ip:ip,
    })
  })
};

export default route;