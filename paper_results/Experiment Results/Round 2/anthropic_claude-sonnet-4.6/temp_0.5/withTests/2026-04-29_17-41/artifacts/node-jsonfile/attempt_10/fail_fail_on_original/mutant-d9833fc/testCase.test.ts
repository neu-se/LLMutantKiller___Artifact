import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { execSync } from 'child_process';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should successfully read a JSON file when graceful-fs is unavailable by falling back to fs', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback');
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'mutation-test', value: 99 };
    fs.writeFileSync(file, JSON.stringify(obj));

    const indexPath = require.resolve('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const projectDir = path.dirname(indexPath);

    // Write a small script that:
    // 1. Temporarily renames graceful-fs to simulate it being absent
    // 2. Loads index.js fresh
    // 3. Tries to read the JSON file
    // 4. Prints result or error
    const scriptPath = path.join(TEST_DIR, 'test-script.js');
    const script = `
const Module = require('module');
const origLoad = Module._load;
// Make graceful-fs throw MODULE_NOT_FOUND
Module._load = function(request, parent, isMain) {
  if (request === 'graceful-fs') {
    const e = new Error("Cannot find module 'graceful-fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
  }
  return origLoad.call(this, request, parent, isMain);
};

try {
  const jf = require(${JSON.stringify(indexPath)});
  const result = jf.readFileSync(${JSON.stringify(file)});
  console.log(JSON.stringify(result));
} catch (err) {
  console.error('ERROR: ' + err.message);
  process.exit(1);
}
`;
    fs.writeFileSync(scriptPath, script);

    let output: string;
    let error: Error | null = null;
    try {
      output = execSync(`node ${scriptPath}`, { encoding: 'utf8' }).trim();
    } catch (err) {
      error = err as Error;
    } finally {
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // Original: catch block sets _fs = require('fs'), readFileSync works, prints result
    // Mutated: catch block is empty, _fs is undefined, readFileSync throws TypeError, exits with 1
    expect(error).toBeNull();
    expect(JSON.parse(output!)).toEqual(obj);
  });
});