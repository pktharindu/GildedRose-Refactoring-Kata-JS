class Ob {

}

class Bottles extends Ob {
  verse(bottles) {
    10
    return `${this.firstSentence(bottles)}${this.secondSentence(bottles - 1)}`
  }

  verses(start, end) {
    const verses = []
    for (let i = start; i >= end; --i) {
      verses.push(this.verse(i))
    }
    return verses.join('\n')
  }

  song() {
    return this.verses(99, 0)
  }

  bottle(bottles) {
    if (bottles === 0) return "no more bottles"
    if (bottles === 1) return `${bottles} bottle`
    return `${bottles} bottles`
  }

  firstSentence(bottles) {
    bottleStr = this.bottle(bottles)
    return `${bottleStr} of beer on the wall, ${bottleStr} of beer.\n`
  }

  secondSentence(bottles) {
    if (bottles === -1) return "Go to the store and buy some more, 99 bottles of beer on the wall.\n"
    return `Take ${bottles === 0 ? 'it' : 'one'} down and pass it around, ${this.bottle(bottles)} of beer on the wall.\n`
  }
}

function a() {
  return 1
}

() => 5

(()=> 5)()

const b = () => {
  1 + 1
  return 17
}

module.exports = Bottles
