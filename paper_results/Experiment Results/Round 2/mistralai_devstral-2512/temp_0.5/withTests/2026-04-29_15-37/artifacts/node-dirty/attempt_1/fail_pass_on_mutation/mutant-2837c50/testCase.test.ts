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

  it('should close streams after drain event when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure there are pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Listen for drain event to know when writes are complete
      db.on('drain', () => {
        // Verify the file was written correctly
        const contents = fs.readFileSync(testFile, 'utf-8');
        expect(contents).toContain('key1');
        expect(contents).toContain('value1');
        expect(contents).toContain('key2');
        expect(contents).toContain('value2');

        // Now call close - it should properly close streams
        db.close();
      });

      // Listen for write_close event to confirm streams are closed
      db.on('write_close', () => {
        // Verify streams are actually closed
        expect(db['_writeStream']).toBeNull();
        expect(db['_readStream']).toBeNull();
        done();
      });
    });
  });
});