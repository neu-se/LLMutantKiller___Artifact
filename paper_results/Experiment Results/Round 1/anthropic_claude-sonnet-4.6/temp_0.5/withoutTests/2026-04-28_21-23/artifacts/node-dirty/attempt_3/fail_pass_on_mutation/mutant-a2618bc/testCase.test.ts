import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush backpressure behavior', () => {
  it('should persist all keys to disk even when backpressure occurs during flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 300;
      let callbacksFired = 0;

      const onAllCallbacks = () => {
        callbacksFired++;
        if (callbacksFired === numKeys) {
          // All callbacks fired - close and verify disk contents
          db.close();
          db.on('write_close', () => {
            try {
              const content = fs.readFileSync(dbPath, 'utf-8');
              const lines = content.trim().split('\n').filter(l => l.length > 0);
              // Each key should appear at least once; last occurrence is canonical
              const seen = new Map<string, number>();
              for (const line of lines) {
                const row = JSON.parse(line);
                seen.set(row.key, (seen.get(row.key) || 0) + 1);
              }
              // All numKeys should be present on disk
              expect(seen.size).toBe(numKeys);
              try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
              done();
            } catch (e) {
              try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
              done(e as Error);
            }
          });
        }
      };

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, { index: i }, onAllCallbacks);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    });
  }, 15000);
});