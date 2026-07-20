import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close until drain event when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Add multiple writes to ensure queue is not empty
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Attempt to close immediately (should be delayed)
      db.close();

      // Verify that close is delayed and write_close is emitted after drain
      let drainFired = false;
      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        expect(drainFired).toBe(true);
        // Verify file was written correctly
        const content = fs.readFileSync(testFile, 'utf-8');
        expect(content).toContain('key1');
        expect(content).toContain('key2');
        expect(content).toContain('key3');
        done();
      });
    });
  });
});