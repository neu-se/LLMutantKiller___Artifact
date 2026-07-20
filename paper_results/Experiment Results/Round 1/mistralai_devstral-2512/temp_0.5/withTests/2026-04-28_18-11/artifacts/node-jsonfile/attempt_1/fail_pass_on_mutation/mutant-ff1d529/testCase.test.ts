import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { sync as rimrafSync } from 'rimraf';

describe('readFileSync with encoding option', () => {
  const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-encoding');
  const file = path.join(TEST_DIR, 'test.json');
  const obj = { name: 'JP' };

  beforeAll(() => {
    rimrafSync(TEST_DIR);
    fs.mkdirSync(TEST_DIR);
    fs.writeFileSync(file, JSON.stringify(obj));
  });

  afterAll(() => {
    rimrafSync(TEST_DIR);
  });

  it('should handle encoding string as option', () => {
    // This test passes with the original code because it properly wraps the encoding string in an options object
    // It will fail with the mutated code because the encoding option is lost when options is set to {}
    const data = readFileSync(file, 'utf8');
    expect(data).toEqual(obj);
  });
});