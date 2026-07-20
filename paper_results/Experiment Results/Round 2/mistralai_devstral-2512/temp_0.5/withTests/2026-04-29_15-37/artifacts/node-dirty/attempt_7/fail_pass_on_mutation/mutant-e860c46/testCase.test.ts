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
      // Create multiple writes to ensure in-flight writes
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Verify we have in-flight writes
      expect(db._inFlightWrites).toBeGreaterThan(0);

      // Track close timing
      const startTime = Date.now();
      let closeCompleted = false;

      db.on('write_close', () => {
        closeCompleted = true;
        const duration = Date.now() - startTime;
        expect(duration).toBeGreaterThan(0);
        expect(db._inFlightWrites).toBe(0);
        done();
      });

      // Call close immediately
      db.close();

      // In original code, close should be delayed
      // In mutated code, close will complete immediately
      setImmediate(() => {
        if (!closeCompleted) {
          // Original behavior - close is delayed
          expect(db._inFlightWrites).toBeGreaterThan(0);
        }
      });
    });
  });
});