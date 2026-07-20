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

  it('should delay close when there are in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force multiple writes to create in-flight writes
      for (let i = 0; i < 10; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Verify there are in-flight writes
      expect(db._inFlightWrites).toBeGreaterThan(0);

      // Call close while writes are in flight
      const closeStart = Date.now();
      db.close();

      // Verify close is delayed until writes complete
      db.on('write_close', () => {
        const closeDuration = Date.now() - closeStart;
        expect(closeDuration).toBeGreaterThan(0);
        expect(db._inFlightWrites).toBe(0);
        done();
      });
    });
  });
});