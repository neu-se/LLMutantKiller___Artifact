import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should properly handle write queue when backpressure occurs', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let writeCount = 0;
    let errorOccurred = false;

    db.on('load', () => {
      // Queue multiple writes to trigger the flush mechanism
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, { value: i }, (err: unknown) => {
          if (err) {
            errorOccurred = true;
            cleanup();
            done(err as Error);
            return;
          }
          writeCount++;

          // After all writes complete, verify the behavior
          if (writeCount === 5) {
            // Verify all writes completed
            for (let j = 0; j < 5; j++) {
              expect(db.get(`key${j}`)).toEqual({ value: j });
            }

            // Verify file contents
            const data = fs.readFileSync(dbPath, 'utf-8');
            const lines = data.trim().split('\n').filter(line => line.trim());
            expect(lines.length).toBe(5);

            cleanup();
            done();
          }
        });
      }
    });

    const cleanup = () => {
      try {
        db.close();
        if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
    };

    db.on('error', (err) => {
      errorOccurred = true;
      cleanup();
      done(err);
    });

    // Final timeout
    setTimeout(() => {
      if (!errorOccurred) {
        cleanup();
        done(new Error('Test timed out'));
      }
    }, 2000);
  });
});