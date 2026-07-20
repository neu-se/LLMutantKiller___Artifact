import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly close after pending writes complete', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Add data to create pending writes
      db.set('test', 'data', () => {
        // Immediately call close while there might still be pending operations
        db.close();

        // The original code should properly wait for drain before closing
        // The mutated code will not properly close streams
        setTimeout(() => {
          // Check if streams are properly closed
          expect(db['_writeStream']).toBeNull();
          expect(db['_readStream']).toBeNull();
          done();
        }, 100);
      });
    });
  });
});