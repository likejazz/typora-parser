import * as fs from 'fs/promises'
import {inspect} from 'util'
import {TyporaParser} from './parser'
import MathJaxRenderer from './mathJax'
import HighlightJsRenderer from './highlightJs'

console.assert = function (condition, msg) {
  if (!condition) throw new Error('Assertion failed' + (msg ? ` ${msg}` : ''))
}

;(async () => {
  const md = await fs.readFile('test.md', {encoding: 'utf8'})
  const parseResult = TyporaParser.parse(md)

  console.log(inspect(parseResult.ast, false, null, true))
  console.log(inspect(parseResult.linkReferences, false, null, true))
  console.log(inspect(parseResult.tocEntries, false, null, true))
  const html = parseResult.renderHTML({
    vanillaHTML: false,
    latexRenderer: new MathJaxRenderer(),
    codeRenderer: new HighlightJsRenderer(),
  })
  // console.log(html)
  await fs.writeFile('out.html', html)
})()
