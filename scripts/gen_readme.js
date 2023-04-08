const path = require('path')
const { promises: fs } = require('fs')
const _template = require('lodash/template')
const jsDoc2MD = require('jsdoc-to-markdown')

/**
 * @private
 */
const getPath = p => path.join(__dirname, '../', p)

const TEMPLATE_SRC = '.README.md'
const TEMPLATE_DST = 'README.md'
const API_SRC = ['dist/**'].map(getPath)

jsDoc2MD.render({ files: API_SRC }).then(async (api) => {
  const templatePath = getPath(TEMPLATE_SRC)
  const templateSrc = await fs.readFile(templatePath, 'utf-8')
  const template = _template(templateSrc)
  const readme = template({ api })
  const dst = getPath(TEMPLATE_DST)

  await fs.writeFile(dst, readme)

  console.log(`rendered ${dst}`)
}).catch((e) => {
  console.error(e.stack)
})
