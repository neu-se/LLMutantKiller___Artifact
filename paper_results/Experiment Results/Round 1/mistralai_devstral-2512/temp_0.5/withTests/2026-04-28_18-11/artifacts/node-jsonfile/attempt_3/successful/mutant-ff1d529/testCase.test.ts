import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { sync as rimrafSync } from 'rimraf';

describe('readFileSync encoding option mutation test', () => {
  const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-mutation');
  const file = path.join(TEST_DIR, 'test.json');
  const obj = { name: 'JP' };

  beforeAll(() => {
    rimrafSync(TEST_DIR);
    fs.mkdirSync(TEST_DIR);
    // Write file with UTF-16 encoding to force encoding handling
    const buffer = Buffer.from(`\uFEFF${JSON.stringify(obj)}`, 'utf16le');
    fs.writeFileSync(file, buffer);
  });

  afterAll(() => {
    rimrafSync(TEST_DIR);
  });

  it('should handle UTF-16 encoding when passed as string option', () => {
    // This test will pass with original code because it properly wraps encoding string in options object
    // It will fail with mutated code because the encoding option is lost when options is set to {}
    // The mutated code will try to read as UTF-8 (default) instead of UTF-16
    const data = readFileSync(file, 'utf16le');
    expect(data).toEqual(obj);
  });
});