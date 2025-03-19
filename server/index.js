import ejs from 'ejs'
import express from 'express'
import path from 'path'
import winston from 'winston'
import { fileURLToPath } from 'url'
import route from './routes/index.js'
import config from './config/default.js'

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
      filename:'httpRequest.log',
    }),
  ]
});


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));  // 前端build生成
app.use(express.static(path.join(__dirname, 'data')));  // 后端获取数据

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Max-Age', '86400'); // 预检请求结果缓存一天（86400秒）

  logger.info(`requestURL:${req.originalUrl},
                requestIP:${req.ip}}`);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

route(app);

app.listen(config.port, () => {
  logger.info(`启动端口${config.port}`);
})
