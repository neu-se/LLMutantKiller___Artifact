import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile encoding option handling', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-encoding-option');
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

  it('should fail when encoding is not properly set from string option', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const content = JSON.stringify({ name: 'JP' });
    // Write file with latin1 encoding to create a mismatch
    fs.writeFileSync(file, content, 'latin1');

    // This should work with original code (encoding properly set to 'utf8')
    // but fail with mutated code (options becomes empty object, defaults to buffer)
    await expect(readFile(file, 'utf8')).resolves.toEqual({ name: 'JP' });
  });
});