import fs from 'fs';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import jf from '../index.js';

describe('readFile with encoding string option', () => {
  let TEST_DIR: string;
  const obj = { name: 'JP' };

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-encoding');
    rimraf.sync(TEST_DIR);
    fs.mkdir(TEST_DIR, done);
  });

  afterEach((done) => {
    rimraf.sync(TEST_DIR);
    done();
  });

  it('should correctly parse JSON when encoding is passed as string', async () => {
    const file = path.join(TEST_DIR, 'test.json');
    fs.writeFileSync(file, JSON.stringify(obj));

    const result = await jf.readFile(file, 'utf8');
    expect(result).toEqual(obj);
  });
});