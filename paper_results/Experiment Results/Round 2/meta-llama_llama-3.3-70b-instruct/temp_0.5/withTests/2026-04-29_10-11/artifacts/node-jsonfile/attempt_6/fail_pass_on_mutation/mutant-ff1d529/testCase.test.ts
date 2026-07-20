import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('+ readFileSync()', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync');
    fs.mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    fs.rmdirSync(TEST_DIR, { recursive: true });
  });

  it('should throw an error when options is not an object or a string', () => {
    const file = path.join(TEST_DIR, 'somefile.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    expect(() => readFileSync(file, 123)).toThrowError();
  });
});