import { readFileSync } from '../index'
import assert = require('assert')
import fs = require('fs')
import path = require('path')
import rimraf = require('rimraf')
import os = require('os')

describe('+ readFileSync()', () => {
  let TEST_DIR: string

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync')
    rimraf.sync(TEST_DIR)
    fs.mkdirSync(TEST_DIR)
    done()
  })

  afterEach((done) => {
    rimraf.sync(TEST_DIR)
    done()
  })

  it('should read and parse JSON', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    const result = readFileSync(file, { encoding: 'utf8' })
    assert.strictEqual(result.name, obj.name)
  })

  it('should throw an error when encoding is not specified', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    assert.throws(() => {
      readFileSync(file, {})
    })
  })
})