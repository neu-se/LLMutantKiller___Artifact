import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile encoding string option', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-encoding-string');
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

  it('should properly handle encoding when passed as string', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const content = JSON.stringify({ name: 'JP' });
    fs.writeFileSync(file, content);

    // This test will pass on original code (encoding properly set)
    // but fail on mutated code (options becomes empty object)
    const result = await readFile(file, 'utf8');
    expect(result).toEqual({ name: 'JP' });
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('name');
  });
});