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

  it('should read and parse JSON with encoding option', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    const result = readFileSync(file, { encoding: 'utf8' })
    assert.strictEqual(result.name, obj.name)
  })

  it.skip('should fail when options is an empty object', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    assert.throws(() => {
      readFileSync(file, {})
    })
  })
})