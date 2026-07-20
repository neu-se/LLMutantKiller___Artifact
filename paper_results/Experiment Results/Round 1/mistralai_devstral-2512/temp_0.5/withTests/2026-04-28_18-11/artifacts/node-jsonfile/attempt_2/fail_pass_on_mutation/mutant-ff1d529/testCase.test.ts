import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { sync as rimrafSync } from 'rimraf';

describe('readFileSync encoding option handling', () => {
  const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-encoding');
  const file = path.join(TEST_DIR, 'test.json');
  const obj = { name: 'JP' };

  beforeAll(() => {
    rimrafSync(TEST_DIR);
    fs.mkdirSync(TEST_DIR);
    // Write file with BOM to test encoding handling
    fs.writeFileSync(file, `\uFEFF${JSON.stringify(obj)}`);
  });

  afterAll(() => {
    rimrafSync(TEST_DIR);
  });

  it('should properly handle BOM when encoding is passed as string', () => {
    // This test passes with original code because it properly wraps encoding string in options object
    // It will fail with mutated code because the encoding option is lost when options is set to {}
    const data = readFileSync(file, 'utf8');
    expect(data).toEqual(obj);
  });
});