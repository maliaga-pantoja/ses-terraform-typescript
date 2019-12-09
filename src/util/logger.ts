import {format, createLogger, transports} from 'winston';
import * as path from 'path'
const {splat, simple, label, printf} = format
const outPutPath = path.join(process.env.LOG_PATH || './output', 'output.log');

const jsonFormat = printf((info) => {
  const message = {
    timestamp: new Date(),
    level: info.level,
    env: info.label,
    message: info.message,
  }
  return JSON.stringify(message);
})

function Logger() {
  const infoLogger = createLogger({
    format: format.combine(
      label({label: process.env.NODE_ENV || 'dev'}),
      splat(),
      simple(),
      jsonFormat
    ),
    transports: [
      new transports.File({
        filename: outPutPath
      }),
      new transports.Console()
    ]
  });
  return {
    writeLog: (options: {message: string, level: string, meta: any}) => {
      if (options.level === 'info'){
        infoLogger.info(options.message, options.meta)
      } else if (options.level === 'error') {
        infoLogger.error(options.message, options.meta)
      } else {
        infoLogger.log('log', options.message, options.meta);
      }
    }
  }
}
export default Logger