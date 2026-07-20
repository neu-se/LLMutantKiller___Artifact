import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should properly break write loop when backpressure occurs', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let writeOperations = 0;
    let errorOccurred = false;

    db.on('load', () => {
      // Force backpressure by filling the write buffer
      const writeStream = fs.createWriteStream(dbPath, { highWaterMark: 16 });
      writeStream.write('x'.repeat(1024)); // Fill buffer to trigger backpressure
      writeStream.end();

      // Queue multiple writes that should trigger the break condition
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, { value: i }, (err: unknown) => {
          if (err) {
            errorOccurred = true;
            done(err as Error);
          }
          writeOperations++;
        });
      }

      // Check after a short delay
      setTimeout(() => {
        try {
          // In original code, _waitForDrain should cause the loop to break
          // In mutated code, the break won't happen and writes may behave differently
          expect(writeOperations).toBe(5);

          // Verify data was written correctly
          const data = fs.readFileSync(dbPath, 'utf-8');
          const lines = data.trim().split('\n').filter(line => line.trim());
          expect(lines.length).toBeGreaterThanOrEqual(5);

          cleanup();
          done();
        } catch (err) {
          cleanup();
          done(err as Error);
        }
      }, 500);
    });

    const cleanup = () => {
      try {
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