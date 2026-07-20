import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync with string encoding option', () => {
  it('should use utf16le encoding to read file when utf16le string is passed as options', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-mutant-utf16')
    fs.mkdirSync(TEST_DIR, { recursive: true })

    const file = path.join(TEST_DIR, 'utf16.json')
    
    // Write JSON file in UTF-16LE encoding
    fs.writeFileSync(file, Buffer.from(JSON.stringify({ name: 'test' }), 'utf16le'))

    // Original: options = { encoding: 'utf16le' } -> reads correctly -> parses OK
    // Mutated:  options = {} -> Buffer read -> toString('utf8') -> garbled -> JSON.parse throws
    const data = jf.readFileSync(file, 'utf16le')

    fs.rmSync(TEST_DIR, { recursive: true })

    expect(data).toEqual({ name: 'test' })
  })
})