const Parse = require('./Parse')

module.exports.getABCScore = (filePath) => {
  const parser = new Parse(filePath)
  parser.ast()
}
