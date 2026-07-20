import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import { spawnSync } from 'child_process'

describe('jsonfile graceful-fs fallback behavior', () => {
  it('should fall back to built-in fs when graceful-fs is unavailable', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-fallback-' + process.pid)
    fs.mkdirSync(TEST_DIR, { recursive: true })

    const dataFile = path.join(TEST_DIR, 'test.json')
    fs.writeFileSync(dataFile, JSON.stringify({ x: 1 }))

    const indexPath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

    const testScript = `
const Module = require('module');
const orig = Module._load;
Module._load = function(req, parent, isMain) {
  if (req === 'graceful-fs') throw new Error('graceful-fs not found');
  return orig.call(this, req, parent, isMain);
};
const jf = require(${JSON.stringify(indexPath)});
const result = jf.readFileSync(${JSON.stringify(dataFile)});
process.stdout.write(JSON.stringify(result));
`

    const scriptPath = path.join(TEST_DIR, 'test-script.js')
    fs.writeFileSync(scriptPath, testScript)

    let result: any
    let scriptError: string | undefined

    try {
      const proc = spawnSync('node', [scriptPath], { encoding: 'utf8', timeout: 5000 })
      if (proc.status !== 0) {
        scriptError = proc.stderr || 'process exited with non-zero status'
      } else {
        result = JSON.parse(proc.stdout)
      }
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
    }

    expect(scriptError).toBeUndefined()
    expect(result).toEqual({ x: 1 })
  })
})