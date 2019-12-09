import * as fs from 'fs'
import * as readline from 'readline'

const sourceFile = process.env["SOURCE_PATH"] || "./input_data/input.csv"

async function Reader (): Promise<string[]> {
  try {
    return new Promise((resolve, reject) => {
      let emailList: string[] = [];
      let counter = 0;
      readline.createInterface({
        input: fs.createReadStream(sourceFile, {
          encoding: 'utf8', 
          autoClose: true,
          start: 0,
        }),
        output: process.stdout,
        terminal: false
      })
      .on('line', (data) => {
        if (counter != 0) {
          const tokennized = data.split(',')
          emailList.push(tokennized[1].trim());
        }
        counter += 1;
      })
      .on('close', () => {
        resolve(emailList);
      })
      .on('error', (e) => {
        console.log('error')
        reject(e)
      })
    })
  } catch (e) {
    throw e;
  }
}
export default Reader;