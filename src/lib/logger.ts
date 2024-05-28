import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import type * as Transport from 'winston-transport'

const { combine, timestamp, json, colorize, printf } = format

const alignColorsAndTime = format.combine(
  // eslint-disable-next-line node/prefer-global/process
  colorize({ all: process.env.NODE_ENV === 'development', level: process.env.NODE_ENV === 'development' }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(
    (info) => {
      const { timestamp, label, level, message, ...args } = info
      return `[${info.level}] ${info.timestamp} : ${info.message} - ${JSON.stringify(args)}`
    },
  ),
)

const transportList: Transport[] = [new transports.Console()]
// eslint-disable-next-line node/prefer-global/process
if (process.env.RUN_TIME !== 'vercel') {
  transportList.push(new transports.DailyRotateFile({
    dirname: `logs`, // 日志保存的目录
    filename: `%DATE%.info.log`, // 日志名称，占位符 %DATE% 取值为 datePattern 值。
    datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
    zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
    maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
    maxFiles: '15d', // 保留日志文件的最大天数，此处表示自动删除超过 15 天的日志文件。
    format: format.combine(json()),
  }))
  transportList.push(new transports.DailyRotateFile({
    level: 'error',
    dirname: `logs`, // 日志保存的目录
    filename: `%DATE%.error.log`, // 日志名称，占位符 %DATE% 取值为 datePattern 值。
    datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
    zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
    maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
    maxFiles: '30d', // 保留日志文件的最大天数，此处表示自动删除超过 30 天的日志文件。
    format: format.combine(json()),
  }))
}

const logger = createLogger({
  format: combine(
    format.colorize(),
    alignColorsAndTime,
  ),
  transports: transportList,
})
export { logger }
