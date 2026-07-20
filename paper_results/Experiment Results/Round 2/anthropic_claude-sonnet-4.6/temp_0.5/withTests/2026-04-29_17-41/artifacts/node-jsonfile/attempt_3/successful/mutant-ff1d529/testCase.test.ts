import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

describe('readFileSync with string encoding option', () => {
  it('should use encoding when string is passed as options, observable via custom fs', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutant-test-ff1d529')

    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true })
    }

    const file = path.join(TEST_DIR, 'test.json')
    const obj = { name: 'jp' }
    fs.writeFileSync(file, JSON.stringify(obj), 'utf8')

    try {
      // Create a custom fs that records what options it receives
      const capturedOptions: any[] = []
      const customFs = {
        readFileSync: (filePath: string, options: any) => {
          capturedOptions.push(options)
          return fs.readFileSync(filePath, options)
        }
      }

      // We can't pass both a string encoding AND a custom fs at the same time
      // through the string-options path. Instead, verify the encoding is preserved
      // by using a latin1-encoded file that would be misread without proper encoding.

      // Write a JSON file with a latin1 character (é = 0xe9 in latin1)
      const latin1File = path.join(TEST_DIR, 'latin1.json')
      // Write raw bytes: {"name":"caf\xe9"} in latin1
      const latin1Content = Buffer.from('{"name":"caf\xe9"}', 'latin1')
      fs.writeFileSync(latin1File, latin1Content)

      const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

      // With original: options = { encoding: 'latin1' }, reads file as latin1 string -> parses correctly
      // With mutated:  options = {}, reads file as Buffer -> JSON.parse(Buffer) uses utf8 by default
      //                latin1 0xe9 is not valid utf8 sequence, so JSON.parse may fail or return wrong value
      const data = jf.readFileSync(latin1File, 'latin1')

      // Original: correctly reads latin1, name = 'café'
      // Mutated: reads as Buffer (utf8), 0xe9 is invalid utf8, JSON.parse may throw or give wrong result
      expect(data).not.toBeNull()
      expect(data.name).toBe('café')
    } finally {
      try { fs.rmSync(TEST_DIR, { recursive: true }) } catch (_) {}
    }
  })
})