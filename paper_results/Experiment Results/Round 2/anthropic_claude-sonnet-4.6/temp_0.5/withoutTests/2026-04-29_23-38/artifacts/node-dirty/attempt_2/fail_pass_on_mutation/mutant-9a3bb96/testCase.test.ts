import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending writes', () => {
  it('should wait for in-flight writes to complete before closing', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainFired = false;
      let allCallbacksCalled = true;
      const callbacksCalled: boolean[] = [];

      // Set multiple values to create pending writes
      for (let i = 0; i < 10; i++) {
        callbacksCalled.push(false);
        const idx = i;
        db.set(`key${i}`, { value: `data${i}` }, () => {
          callbacksCalled[idx] = true;
        });
      }

      db.on('drain', () => {
        drainFired = true;
      });

      // Close immediately - with pending queue items
      db.close();

      db.on('write_close', () => {
        // Verify the file was written with all the data
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n').filter((l: string) => l.length > 0);

          // All 10 writes should have been persisted before close
          expect(lines.length).toBe(10);

          // All callbacks should have been called before close
          for (let i = 0; i < callbacksCalled.length; i++) {
            if (!callbacksCalled[i]) {
              allCallbacksCalled = false;
            }
          }
          expect(allCallbacksCalled).toBe(true);

          // Drain should have fired
          expect(drainFired).toBe(true);

          // Cleanup
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});