/* eslint-env mocha */

import { expect } from 'chai'
import { capitalize } from '../../utils'

describe('utils:capitalize', function () {
  it('should capitalize the first letter of a string', function () {
    expect(capitalize('hello world')).to.equal('Hello world')
  })
})
