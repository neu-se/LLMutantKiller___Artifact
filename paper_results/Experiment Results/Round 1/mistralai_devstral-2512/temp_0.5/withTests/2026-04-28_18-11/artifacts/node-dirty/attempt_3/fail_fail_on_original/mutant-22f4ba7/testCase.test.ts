import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-behavior.dirty');
  let db: any;

  beforeEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  afterEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  it('should delay close until all operations complete', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let closeCalledImmediately = false;
      let writeCloseFired = false;

      // Override close to detect immediate calls
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalledImmediately = true;
        return originalClose();
      };

      db.on('write_close', () => {
        writeCloseFired = true;
      });

      // Add multiple writes to create pending operations
      db.set('key1', 'value1', () => {});
      db.set('key2', 'value2', () => {});
      db.set('key3', 'value3', () => {});

      // Call close immediately after setting values
      db.close();

      // Check behavior after a small delay
      setImmediate(() => {
        if (closeCalledImmediately && !writeCloseFired) {
          // This is the mutated behavior - close was called but write_close didn't fire
          done(new Error('Close was called without waiting for pending writes'));
        } else {
          // Original behavior - close waited for drain
          done();
        }
      });
    });
  });
});