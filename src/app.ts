import * as  Uuid from 'uuid'
import Reader from './reader'
import Logger from './util/logger'
import SES from './util/ses'

async function Main () {
  const processId = Uuid.v4();
  const logger = Logger();
  try {
    const data = await Reader();
    const ses = SES()
    await ses.sendEmail({
      
    })
    logger.writeLog({
      level: 'info',
      message: processId,
      meta: {
        message: 'process done',
        stack: ''
      }
    })
  } catch (e) {
    logger.writeLog({
      level: 'error',
      message: processId,
      meta: {
        message: e.message,
        stack: e.stack
      }
    })
  }
}
Main()
.then(() => {
  console.log('done')
})
.catch(e => {
  console.log(e.message)
})