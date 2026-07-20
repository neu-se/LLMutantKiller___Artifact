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

  it('should fail when encoding option is not properly set', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const content = JSON.stringify({ name: 'JP' });
    // Write file with latin1 encoding
    fs.writeFileSync(file, content, 'latin1');

    // Try to read with utf8 encoding - should work with original code
    // but fail with mutated code (where options becomes {})
    await expect(readFile(file, 'utf8')).resolves.toEqual({ name: 'JP' });
  });
});