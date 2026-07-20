import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should properly close streams when called with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Track if close was properly called
      let closeProperlyCalled = false;

      // Override close to track if it's called
      const originalClose = dirty.close.bind(dirty);
      dirty.close = function() {
        closeProperlyCalled = true;
        originalClose();
      };

      // Force close while there are pending writes
      dirty.close();

      // Check if close was called properly
      setImmediate(() => {
        try {
          if (!closeProperlyCalled) {
            throw new Error('Close was not called properly');
          }
          if (dirty._writeStream !== null || dirty._readStream !== null) {
            throw new Error('Streams should be closed');
          }
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        } catch (err) {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done(err);
        }
      });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});