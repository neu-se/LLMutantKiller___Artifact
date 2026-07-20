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

  it('should wait for drain when there are pending writes but no queue', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value without callback to create an in-flight write
      db.set('key1', 'value1');

      // Immediately try to close while write is in flight
      db.close();

      // The original code should wait for drain before closing
      // The mutated code would close immediately since queue is empty
      db.on('write_close', () => {
        // Verify the file was actually written
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        done();
      });
    });
  });
});