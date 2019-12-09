import * as AWS from 'aws-sdk'
import { SendBulkTemplatedEmailRequest } from 'aws-sdk/clients/ses';
interface sendEmailInterface {
  to: string[],
  from: string,
  templatePath: string,
  replacements: object,
  replyTo: string[],
}
function SES () {
  return {
    sendEmail: async (options: sendEmailInterface):  Promise<AWS.SES.SendBulkTemplatedEmailResponse>=> {
      const params: SendBulkTemplatedEmailRequest = {
        Destinations: [{
            Destination: {
              ToAddresses: options.to
            }
        }],
        Source: options.from,
        Template: options.templatePath,
        DefaultTemplateData: JSON.stringify(options.replacements),
        ReplyToAddresses: options.replyTo
      }
      return new Promise((resolve, reject) => {
        new AWS.SES({
          apiVersion: '2010-12-01'
        })
        .sendBulkTemplatedEmail(params, (sesError, sesOk: AWS.SES.SendBulkTemplatedEmailResponse) => {
          if(sesError) {
            reject(sesError);
          } else {
            resolve(sesOk)
          }
        })
      })
    }
  }
}
export default SES