import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close-inflight.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close when there are in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force multiple writes to create in-flight writes
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Immediately call close while writes are in flight
      const closeStart = Date.now();
      db.close();

      // Verify close is delayed
      db.on('write_close', () => {
        const closeDuration = Date.now() - closeStart;
        expect(closeDuration).toBeGreaterThan(0);

        // Verify all writes completed
        const content = fs.readFileSync(testFile, 'utf-8');
        const lines = content.trim().split('\n');
        expect(lines.length).toBe(100);
        done();
      });
    });
  });
});