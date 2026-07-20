const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')
const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync encoding string option', () => {
  let TEST_DIR: string

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-encoding')
    rimraf.sync(TEST_DIR)
    fs.mkdir(TEST_DIR, done)
  })

  afterEach((done) => {
    rimraf.sync(TEST_DIR)
    done()
  })

  it('should correctly handle encoding string option with reviver', () => {
    const file = path.join(TEST_DIR, 'test-reviver.json')
    const testObj = { name: 'Test', date: 'date:2023-01-01' }
    const reviver = (key: string, value: any) => {
      if (typeof value === 'string' && value.startsWith('date:')) {
        return new Date(value.substring(5))
      }
      return value
    }

    fs.writeFileSync(file, JSON.stringify(testObj))

    const result = jf.readFileSync(file, { encoding: 'utf8', reviver })

    assert.deepStrictEqual(result.name, 'Test')
    assert(result.date instanceof Date)
    assert.strictEqual(result.date.toISOString().substring(0, 10), '2023-01-01')
  })
})