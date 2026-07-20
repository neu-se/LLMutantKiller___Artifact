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

  it('should parse JSON correctly when options is an object with encoding', () => {
    const file = path.join(TEST_DIR, 'somefile.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    const result = readFileSync(file, { encoding: 'utf8' });
    expect(result).toEqual(obj);
  });
});