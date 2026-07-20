import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import jf from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFileSync with encoding string option', () => {
  let TEST_DIR: string;

  beforeEach((done) => {
    TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-readfile-sync-encoding');
    rimraf.sync(TEST_DIR);
    fs.mkdir(TEST_DIR, done);
  });

  afterEach((done) => {
    rimraf.sync(TEST_DIR);
    done();
  });

  it('should correctly parse JSON when encoding is passed as string', () => {
    const file = path.join(TEST_DIR, 'test-encoding.json');
    const testObj = { name: 'Test', value: 123 };

    // Write the file with UTF-8 encoding
    fs.writeFileSync(file, JSON.stringify(testObj));

    // Read with encoding as string option
    const result = jf.readFileSync(file, 'utf8');

    // Verify the result matches the original object
    expect(result).toEqual(testObj);
  });
});