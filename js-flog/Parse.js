const fs = require('fs')
const parser = require('@babel/parser')
const chalk = require('chalk')
const scorer = require('./Score')

class Parse {
  constructor(filepath) {
    try {
      this.code = fs.readFileSync(filepath, 'utf-8')

      const pathParts =  filepath.split('/')
      this.filename = pathParts[pathParts.length - 1]

      this.scorer = scorer
      this.stack = []
    } catch (e) {
      throw e
    }
  }

  ast () {
    const ast = parser.parse(this.code)
    const sloc = ast.loc.end.line - ast.loc.start.line

    console.log(`Source file: ${chalk.green(this.filename)} has ${chalk.green(sloc)} lines`)

    fs.writeFileSync('./data/ast.json', JSON.stringify(ast, null, 2))

    const score = this.traverse(ast.program)
    console.log(score)
    console.log(this.stack)
}
  traverse(node) {
    let score = 0

    console.log(chalk.green(`Pushing ${node.type} onto the stack`))
    this.stack.push(node.type)

    if (Array.isArray(node.body)) {
      node.body.map(childNode => {
        score += this.traverse(childNode)
      })
    }
    else if (node.body) {
      score += this.traverse(node.body)
    }

    console.log(chalk.yellow(`Node type ${node.type} my children score is ${score}`))
    score += this.scorer.score(node)
    // console.log(chalk.red(`Popping ${node.type} off the stack`))
    this.stack.pop()

    return score
  }
}

module.exports = Parse
