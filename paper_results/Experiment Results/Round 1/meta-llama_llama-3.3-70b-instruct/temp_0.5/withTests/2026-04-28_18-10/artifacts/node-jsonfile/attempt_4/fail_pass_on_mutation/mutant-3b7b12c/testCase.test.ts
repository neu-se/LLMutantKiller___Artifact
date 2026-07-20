import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';

describe('readFile', () => {
  let TEST_DIR: string;

  beforeEach(() => {
    TEST_DIR = path.join(require('os').tmpdir(), 'jsonfile-tests-readfile');
    fs.mkdirSync(TEST_DIR);
  });

  afterEach(() => {
    fs.rmdirSync(TEST_DIR, { recursive: true });
  });

  it('should parse JSON when options is a string', (done) => {
    const file = path.join(TEST_DIR, 'somefile.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    readFile(file, 'utf8', (err, data) => {
      expect(err).toBeNull();
      expect(data.name).toBe('JP');
      done();
    });
  });
});