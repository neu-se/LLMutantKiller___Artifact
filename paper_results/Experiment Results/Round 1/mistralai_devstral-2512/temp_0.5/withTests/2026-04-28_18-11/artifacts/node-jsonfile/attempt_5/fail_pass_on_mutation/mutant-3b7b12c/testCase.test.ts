import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile encoding handling', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-encoding');
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
    fs.mkdirSync(TEST_DIR);
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
  });

  it('should properly handle encoding when string option is passed', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    // Create a file with UTF-8 encoded content
    const content = JSON.stringify({ name: 'JP', special: '©®™' });
    fs.writeFileSync(file, content, 'utf8');

    // This should work with original code (encoding properly set)
    // but fail with mutated code (encoding not set, defaults to buffer)
    const result = await readFile(file, 'utf8');
    expect(result).toEqual({ name: 'JP', special: '©®™' });
    expect(typeof result.special).toBe('string');
  });
});