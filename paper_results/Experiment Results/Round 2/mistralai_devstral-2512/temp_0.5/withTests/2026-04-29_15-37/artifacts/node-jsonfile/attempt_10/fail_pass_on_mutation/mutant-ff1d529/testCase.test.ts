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

  it('should handle encoding string option with special characters', () => {
    const file = path.join(TEST_DIR, 'test-special.json')
    const testObj = { name: 'Test', value: 123 }

    // Write file with UTF-8 encoding including special characters
    fs.writeFileSync(file, JSON.stringify(testObj))

    // Read with encoding as string option
    const result = jf.readFileSync(file, 'utf8')

    assert.strictEqual(result.name, 'Test')
    assert.strictEqual(result.value, 123)
  })
})