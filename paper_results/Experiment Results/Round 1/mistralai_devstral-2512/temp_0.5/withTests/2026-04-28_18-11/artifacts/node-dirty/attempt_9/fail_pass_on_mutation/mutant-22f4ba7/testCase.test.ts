import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
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

  it('should delay close when operations are pending', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let closeCalled = false;
      let drainFired = false;
      let writeCloseFired = false;

      // Track when close is actually called
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalled = true;
        return originalClose();
      };

      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        writeCloseFired = true;
      });

      // Add multiple writes to ensure pending operations
      db.set('key1', 'value1', () => {});
      db.set('key2', 'value2', () => {});
      db.set('key3', 'value3', () => {});

      // Immediately call close
      db.close();

      // Check behavior after events should have fired
      setImmediate(() => {
        if (closeCalled && writeCloseFired && !drainFired) {
          // This indicates mutated behavior where close doesn't wait for drain
          done(new Error('Close completed without waiting for drain event'));
        } else {
          // Original behavior - close waits for drain
          done();
        }
      });
    });
  });
});