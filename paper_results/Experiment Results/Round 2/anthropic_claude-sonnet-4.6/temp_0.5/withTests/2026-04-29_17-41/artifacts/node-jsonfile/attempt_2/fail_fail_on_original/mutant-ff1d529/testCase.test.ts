import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync with string as options parameter', () => {
  it('should preserve encoding when string is passed as options', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutant-test-ff1d529')

    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true })
    }

    const file = path.join(TEST_DIR, 'test.json')
    const obj = { name: 'jp' }
    fs.writeFileSync(file, JSON.stringify(obj), 'utf8')

    // Spy on fs.readFileSync to observe what options are passed
    const spy = jest.spyOn(fs, 'readFileSync')

    let data: any
    try {
      // When 'utf8' is passed as string option:
      // Original code: options = { encoding: 'utf8' } -> fs.readFileSync called with { encoding: 'utf8' }
      // Mutated code:  options = {}                   -> fs.readFileSync called with {}
      data = jf.readFileSync(file, 'utf8')
    } finally {
      spy.mockRestore()
      try { fs.unlinkSync(file) } catch (_) {}
      try { fs.rmdirSync(TEST_DIR) } catch (_) {}
    }

    // Find the spy call that read our file
    const ourCall = spy.mock.calls.find((args: any[]) => args[0] === file)
    expect(ourCall).toBeDefined()

    // Original: options passed to readFileSync should include encoding: 'utf8'
    // Mutated:  options passed to readFileSync will be {} (no encoding property)
    const passedOptions = ourCall![1] as any
    expect(passedOptions).toHaveProperty('encoding', 'utf8')

    expect(data).not.toBeNull()
    expect(data.name).toBe('jp')
  })
})