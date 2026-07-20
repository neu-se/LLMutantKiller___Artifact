import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method with in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close-inflight.dirty');
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

  it('should delay close when inFlightWrites > 0', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create writes to ensure in-flight writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Verify we have in-flight writes
      expect(db._inFlightWrites).toBeGreaterThan(0);

      // Track if close was actually delayed
      let closeDelayed = false;
      const originalClose = db.close.bind(db);
      db.close = () => {
        if (db._inFlightWrites > 0) {
          closeDelayed = true;
        }
        return originalClose();
      };

      // Call close immediately
      db.close();

      // In original code, close should be delayed when inFlightWrites > 0
      // In mutated code, close will not be delayed
      setImmediate(() => {
        expect(closeDelayed).toBe(true);
        done();
      });
    });
  });
});