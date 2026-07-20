import fs from 'fs';
import os from 'os';
import path from 'path';
import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile with encoding string option', () => {
  let TEST_DIR: string;
  const obj = { name: 'JP' };

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-encoding');
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

  it('should correctly parse JSON when encoding is passed as string option', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    const fileContent = JSON.stringify(obj);
    fs.writeFileSync(file, fileContent);

    const result = await readFile(file, 'utf8');
    expect(result).toEqual(obj);
    expect(result).toHaveProperty('name', 'JP');
  });
});