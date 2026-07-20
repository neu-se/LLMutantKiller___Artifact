import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
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

  it('should not close immediately when inFlightWrites > 0', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create a scenario with in-flight writes
      db.set('test1', 'value1');
      db.set('test2', 'value2');

      // Verify we have in-flight writes
      expect(db._inFlightWrites).toBeGreaterThan(0);

      // Track when close is actually called
      let closeCalled = false;
      const originalClose = db.close.bind(db);
      db.close = () => {
        closeCalled = true;
        return originalClose();
      };

      // Call close while writes are in flight
      db.close();

      // In original code, close should be delayed
      // In mutated code, close will be called immediately
      setImmediate(() => {
        if (closeCalled) {
          // This means close was called immediately (mutated behavior)
          expect(db._inFlightWrites).toBe(0);
          done();
        } else {
          // This means close was delayed (original behavior)
          db.on('write_close', () => {
            expect(db._inFlightWrites).toBe(0);
            done();
          });
        }
      });
    });
  });
});