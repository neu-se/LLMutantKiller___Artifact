import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile encoding preservation', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-encoding-preservation');
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

  it('should preserve encoding when string option is passed', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const content = JSON.stringify({ name: 'JP', special: '©®™' });
    fs.writeFileSync(file, content, 'utf8');

    // This will work with original code (encoding preserved)
    // but fail with mutated code (encoding lost)
    const result = await readFile(file, 'utf8');
    expect(result).toEqual({ name: 'JP', special: '©®™' });
    expect(result.special).toBe('©®™');
  });
});