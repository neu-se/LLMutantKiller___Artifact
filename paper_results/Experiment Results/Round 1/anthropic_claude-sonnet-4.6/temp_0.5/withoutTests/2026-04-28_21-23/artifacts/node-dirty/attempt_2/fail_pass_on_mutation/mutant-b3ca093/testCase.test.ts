import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure handling', () => {
  it('should call each write callback exactly once even when multiple sets are queued', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);
    const callbackCounts: Record<string, number> = {};

    db.on('load', () => {
      const numKeys = 300;
      let completedCallbacks = 0;

      for (let i = 0; i < numKeys; i++) {
        const key = `key-${i}`;
        callbackCounts[key] = 0;
        db.set(key, { index: i, payload: 'a'.repeat(1000) }, (err: unknown) => {
          callbackCounts[key]++;
          completedCallbacks++;
          if (completedCallbacks === numKeys) {
            const duplicates = Object.entries(callbackCounts).filter(([, count]) => count > 1);
            db.close();
            db.on('write_close', () => {
              fs.rmSync(tmpDir, { recursive: true, force: true });
              expect(duplicates).toHaveLength(0);
              done();
            });
          }
        });
      }
    });

    db.on('error', (err: unknown) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err as Error);
    });
  }, 15000);
});