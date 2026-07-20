import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending writes', () => {
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

  it('should properly delay close when writes are pending', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let closeCalled = false;
      let drainFired = false;

      // Track when close is actually called
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalled = true;
        return originalClose();
      };

      db.on('drain', () => {
        drainFired = true;
      });

      // Add multiple writes to ensure pending operations
      db.set('key1', 'value1', () => {});
      db.set('key2', 'value2', () => {});
      db.set('key3', 'value3', () => {});

      // Immediately call close
      db.close();

      // In original code, close should be delayed until drain
      // In mutated code, close will be called immediately
      setImmediate(() => {
        if (closeCalled && !drainFired) {
          // This indicates the mutated behavior
          done(new Error('Close was called before drain event fired'));
        } else {
          // Original behavior - close waited for drain
          done();
        }
      });
    });
  });
});