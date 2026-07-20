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

  it('should correctly parse JSON with encoding string and reviver', () => {
    const file = path.join(TEST_DIR, 'test-reviver.json')
    const testObj = { name: 'Test', date: 'date:2023-01-01' }

    fs.writeFileSync(file, JSON.stringify(testObj))

    const reviver = (key: string, value: any) => {
      if (typeof value === 'string' && value.startsWith('date:')) {
        return new Date(value.substring(5))
      }
      return value
    }

    const result = jf.readFileSync(file, 'utf8')

    assert.strictEqual(result.name, 'Test')
    assert.strictEqual(result.date, 'date:2023-01-01')
  })
})