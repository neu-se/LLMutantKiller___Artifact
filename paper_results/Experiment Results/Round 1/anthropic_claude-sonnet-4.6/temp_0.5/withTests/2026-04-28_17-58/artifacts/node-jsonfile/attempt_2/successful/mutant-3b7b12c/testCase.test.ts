import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFile async with encoding string as option', () => {
  it('should read JSON file correctly when encoding is passed as a string', async () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-enc-test-' + process.pid)
    fs.mkdirSync(TEST_DIR, { recursive: true })
    const file = path.join(TEST_DIR, 'test.json')
    const obj = { name: 'JP', value: 42 }
    fs.writeFileSync(file, JSON.stringify(obj), 'utf8')

    try {
      // With original code: options becomes { encoding: 'utf8' }
      // fs.readFile returns a string, JSON.parse(string) works fine
      // With mutant code: options becomes {}
      // fs.readFile returns a Buffer, JSON.parse(Buffer) also works
      // BUT: we can detect via a custom fs that checks what options were passed
      // Instead, use a reviver passed separately - but string option doesn't allow that.
      
      // The real detectable case: pass encoding string, and the file has a BOM.
      // With encoding set, fs.readFile returns string with BOM stripped by stripBom.
      // With no encoding (Buffer), stripBom also handles it. Both work.
      
      // Most reliable: verify that when encoding='utf8' is passed as string,
      // the result is correctly parsed (this works for both - not a good discriminator).
      
      // Actually the key difference: with mutant options={}, options.fs is undefined
      // (same as original). options.throws is undefined (same). options.reviver undefined (same).
      // The ONLY difference is encoding is lost. This causes fs.readFile to return Buffer vs string.
      // JSON.parse handles both. So for normal files, behavior is identical!
      
      // The ONLY way to detect: use a file where Buffer vs string matters.
      // e.g., a latin1-encoded file read with 'latin1' encoding.
      const latin1File = path.join(TEST_DIR, 'latin1.json')
      // Write a JSON with a latin1 character (e.g., é = 0xe9)
      const buf = Buffer.from('{"name":"caf\xe9"}', 'latin1')
      fs.writeFileSync(latin1File, buf)
      
      // With original: encoding='latin1' -> fs.readFile returns string 'caf\xe9' -> JSON.parse works -> { name: 'café' }
      // With mutant: encoding lost -> fs.readFile returns Buffer -> toString() called by JSON.parse
      //   JSON.parse(Buffer) calls buffer.toString() which defaults to utf8
      //   0xe9 in utf8 is invalid -> replacement character -> JSON.parse might fail or give wrong result
      const data = await jf.readFile(latin1File, 'latin1')
      expect(data.name).toBe('café')
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
    }
  })
})