import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'
import assert = require('assert')
import fs = require('fs')
import path = require('path')
import { tmpdir } from 'os'

describe('+ readFileSync()', () => {
  let TEST_DIR: string

  beforeEach(() => {
    TEST_DIR = path.join(tmpdir(), 'jsonfile-tests-readfile-sync')
    fs.mkdirSync(TEST_DIR)
  })

  afterEach(() => {
    fs.rmdirSync(TEST_DIR, { recursive: true })
  })

  it('should throw an error when options is not an object with encoding property', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    assert.throws(() => {
      readFileSync(file, 'utf8')
    }, Error)
  })
})