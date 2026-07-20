const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')
const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync encoding string option', () => {
  let TEST_DIR

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-encoding')
    rimraf.sync(TEST_DIR)
    fs.mkdir(TEST_DIR, done)
  })

  afterEach((done) => {
    rimraf.sync(TEST_DIR)
    done()
  })

  it('should fail when encoding is passed as string to non-existent file', () => {
    const file = path.join(TEST_DIR, 'non-existent.json')

    assert.throws(() => {
      jf.readFileSync(file, 'utf8')
    }, (err) => {
      assert(err instanceof Error)
      assert(err.message.includes('non-existent.json'))
      return true
    })
  })
})