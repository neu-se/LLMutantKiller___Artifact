import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should handle backpressure correctly during concurrent writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let writeCount = 0;
    let drainCount = 0;
    let errorOccurred = false;

    db.on('load', () => {
      // Create a small write buffer to trigger backpressure
      const writeStream = fs.createWriteStream(dbPath, { highWaterMark: 16 });
      writeStream.write('a'.repeat(1024)); // Fill the buffer
      writeStream.end();

      db.on('drain', () => {
        drainCount++;
      });

      // Perform multiple writes that should trigger backpressure
      for (let i = 0; i < 10; i++) {
        db.set(`key${i}`, { value: i }, (err: unknown) => {
          if (err) {
            errorOccurred = true;
            done(err as Error);
          }
          writeCount++;
        });
      }
    });

    db.on('error', (err) => {
      errorOccurred = true;
      cleanupAndDone(err);
    });

    const cleanupAndDone = (err?: Error) => {
      setTimeout(() => {
        try {
          if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
          }
          fs.rmdirSync(testDir);
          if (err) {
            done(err);
          } else {
            // In mutated version, writes won't properly handle backpressure
            // so we expect all writes to complete in original but not mutated
            expect(writeCount).toBe(10);
            expect(drainCount).toBeGreaterThan(0);
            done();
          }
        } catch (cleanupErr) {
          done(cleanupErr as Error);
        }
      }, 100);
    };

    // Timeout to prevent hanging
    setTimeout(() => {
      if (!errorOccurred) {
        cleanupAndDone(new Error('Test timed out'));
      }
    }, 2000);
  });
});