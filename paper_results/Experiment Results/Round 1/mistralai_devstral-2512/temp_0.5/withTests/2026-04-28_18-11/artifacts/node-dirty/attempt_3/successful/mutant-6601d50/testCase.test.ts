import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-behavior.dirty');
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should properly schedule close on drain event when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to create pending writes
      db.set('testKey', 'testValue');

      // Spy on the once method to verify it's called with correct event name
      const originalOnce = db.once;
      let onceCalledWith = null;
      db.once = function(event: string, callback: Function) {
        onceCalledWith = event;
        return originalOnce.call(this, event, callback);
      };

      // Call close while there are pending writes
      db.close();

      // Verify once was called with 'drain' event
      expect(onceCalledWith).toBe('drain');

      // Clean up and complete test
      setImmediate(() => {
        done();
      });
    });
  });
});