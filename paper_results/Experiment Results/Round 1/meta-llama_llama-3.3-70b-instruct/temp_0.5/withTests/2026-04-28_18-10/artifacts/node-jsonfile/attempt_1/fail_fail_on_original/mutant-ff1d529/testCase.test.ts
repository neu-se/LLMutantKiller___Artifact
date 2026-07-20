import { readFileSync } from '../../../index.js'
import { assert } from 'assert'
import { fs, path, rimraf } from 'fs'
import { tmpdir } from 'os'

describe('+ readFileSync()', () => {
  let TEST_DIR: string

  beforeEach((done) => {
    TEST_DIR = path.join(tmpdir(), 'jsonfile-tests-readfile-sync')
    rimraf.sync(TEST_DIR)
    fs.mkdir(TEST_DIR, done)
  })

  afterEach((done) => {
    rimraf.sync(TEST_DIR)
    done()
  })

  it('should throw an error when options is not an object', () => {
    const file = path.join(TEST_DIR, 'somefile.json')
    const obj = { name: 'JP' }
    fs.writeFileSync(file, JSON.stringify(obj))

    assert.throws(() => {
      readFileSync(file, 'utf8')
    }, (err) => {
      assert(err instanceof TypeError)
      return true
    })
  })
})