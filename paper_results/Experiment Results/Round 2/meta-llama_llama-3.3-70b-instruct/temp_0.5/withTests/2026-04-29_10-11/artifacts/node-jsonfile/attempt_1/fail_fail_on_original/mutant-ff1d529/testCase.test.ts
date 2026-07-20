import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('+ readFileSync()', () => {
  let TEST_DIR: string;

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync');
    rimraf.sync(TEST_DIR);
    fs.mkdir(TEST_DIR, done);
  });

  afterEach((done) => {
    rimraf.sync(TEST_DIR);
    done();
  });

  it('should throw an error when options is a string', () => {
    const file = path.join(TEST_DIR, 'somefile.json');
    const obj = { name: 'JP' };
    fs.writeFileSync(file, JSON.stringify(obj));

    expect(() => readFileSync(file, 'utf8')).toThrowError();
  });
});