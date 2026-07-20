import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile with string encoding option', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-string-encoding');
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

  it('should properly handle string encoding option', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const content = JSON.stringify({ name: 'JP' });
    fs.writeFileSync(file, content);

    // This test will pass on original code where 'utf8' becomes { encoding: 'utf8' }
    // but should fail on mutated code where 'utf8' becomes {}
    const result = await readFile(file, 'utf8');
    expect(result).toEqual({ name: 'JP' });
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('name', 'JP');
  });
});