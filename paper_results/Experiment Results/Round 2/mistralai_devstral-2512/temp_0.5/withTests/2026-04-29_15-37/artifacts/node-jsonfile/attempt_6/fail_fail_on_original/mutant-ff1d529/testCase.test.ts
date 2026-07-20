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

  it('should fail when encoding string is passed with invalid JSON', () => {
    const file = path.join(TEST_DIR, 'invalid.json')
    fs.writeFileSync(file, '{invalid json}')

    try {
      jf.readFileSync(file, 'utf8')
      assert.fail('Expected to throw an error')
    } catch (err: any) {
      assert(err instanceof Error)
      assert(err.message.includes('invalid.json'))
      assert(err.message.includes('Unexpected token'))
    }
  })
})