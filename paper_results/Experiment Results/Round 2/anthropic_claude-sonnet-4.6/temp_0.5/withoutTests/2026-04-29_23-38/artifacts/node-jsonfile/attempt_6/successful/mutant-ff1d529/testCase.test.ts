import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should use latin1 encoding when passed as string option', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      // Write a JSON file encoded in latin1 with characters that are 
      // valid latin1 but invalid UTF-8 sequences
      // 0x80-0xBF bytes are invalid as UTF-8 start bytes
      // In latin1, \x80 is a valid character
      // JSON string with a latin1 character that creates invalid UTF-8
      const jsonStr = '{"v":1}'
      // Write using latin1 so the bytes are the direct char codes
      fs.writeFileSync(tmpFile, jsonStr, 'latin1')
      
      // Now write a file with bytes that are valid latin1 JSON but 
      // would be misread as UTF-8 Buffer
      // Use byte 0x81 which is valid latin1 but invalid UTF-8
      // Craft: {"v":"\x81"} in latin1
      const latin1Json = Buffer.from([
        0x7B, 0x22, 0x76, 0x22, 0x3A, 0x22, 0x81, 0x22, 0x7D
        // {    "    v    "    :    "   \x81  "    }
      ])
      fs.writeFileSync(tmpFile, latin1Json)
      
      // With latin1 encoding: reads as string '{"v":"\x81"}' → parses to { v: '\x81' }
      // Without encoding (Buffer): Buffer.toString() uses UTF-8, 0x81 is invalid UTF-8
      //   → replacement character or error → JSON parse may fail or give different result
      const result = jsonfile.readFileSync(tmpFile, 'latin1')
      
      expect(result).toEqual({ v: '\x81' })
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})