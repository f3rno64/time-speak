/* eslint-env mocha */

import { expect } from 'chai'
import { capitalize } from '../../utils'

describe('utils:capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello world')).to.equal('Hello world')
  })
})
