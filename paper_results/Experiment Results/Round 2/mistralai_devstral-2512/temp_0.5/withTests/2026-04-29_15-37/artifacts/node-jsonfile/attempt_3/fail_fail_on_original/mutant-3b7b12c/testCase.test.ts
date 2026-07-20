import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../index.js';

describe('readFile with encoding string option', () => {
  let TEST_DIR: string;
  let originalFile: string;

  beforeEach(() => {
    TEST_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    originalFile = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'Test', value: 123 };
    fs.writeFileSync(originalFile, JSON.stringify(obj));
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it('should correctly parse JSON when encoding is passed as string', async () => {
    const result = await readFile(originalFile, 'utf8');
    expect(result).toEqual({ name: 'Test', value: 123 });
  });
});