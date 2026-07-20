import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync with string encoding option', () => {
  it('should properly handle throws option when encoding string is passed - encoding must be preserved for throws:false to work via string option chain', () => {
    // The mutation changes options from { encoding: 'utf8' } to {}
    // This means fs.readFileSync returns a Buffer instead of a string
    // stripBom on a Buffer won't strip the BOM character
    // JSON.parse on a Buffer with BOM will throw SyntaxError
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-mutant-enc2')
    fs.mkdirSync(TEST_DIR, { recursive: true })
    
    const file = path.join(TEST_DIR, 'bom.json')
    const obj = { name: 'test' }
    
    // Write file with UTF-8 BOM (EF BB BF bytes)
    const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])
    const contentBuffer = Buffer.from(JSON.stringify(obj), 'utf8')
    fs.writeFileSync(file, Buffer.concat([bomBuffer, contentBuffer]))
    
    // With original: options becomes { encoding: 'utf8' }
    //   -> fs.readFileSync returns string '\uFEFF{"name":"test"}'
    //   -> stripBom strips BOM -> '{"name":"test"}'
    //   -> JSON.parse succeeds
    // With mutation: options becomes {}
    //   -> fs.readFileSync returns Buffer <EF BB BF 7B ...>
    //   -> stripBom on Buffer - depends on implementation
    //   -> JSON.parse(Buffer) -> Buffer.toString() -> '\uFEFF{"name":"test"}'
    //   -> JSON.parse fails with SyntaxError (BOM not stripped)
    
    expect(() => jf.readFileSync(file, 'utf8')).not.toThrow()
    
    const data = jf.readFileSync(file, 'utf8')
    expect(data).toEqual(obj)
    
    fs.rmSync(TEST_DIR, { recursive: true })
  })
})