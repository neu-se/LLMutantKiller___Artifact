import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should wait for pending writes before closing', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value without callback to create pending write
      db.set('key1', 'value1');

      // Try to close immediately
      db.close();

      // Verify write_close event fires (indicating close completed)
      db.on('write_close', () => {
        // Verify the file was actually written
        const contents = fs.readFileSync(testFile, 'utf-8');
        const expected = JSON.stringify({key: 'key1', val: 'value1'}) + '\n';
        expect(contents).toBe(expected);
        done();
      });
    });
  });
});