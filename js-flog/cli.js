const chalk = require('chalk')
const { getABCScore } = require('./index')

module.exports.cli = (args) => {
  try {
    if (args.length < 3) {
      console.log('js-flog takes a javascript source file and scores it for ABC metrics: Assignments, Branches, Conditionals.')
      console.log(`Usage: ${chalk.green('js-flog <<filePath>>')}`)
    } else {
      getABCScore(args[2])
    }
  } catch(e) {
    console.error(chalk.red(e))
  }
}
