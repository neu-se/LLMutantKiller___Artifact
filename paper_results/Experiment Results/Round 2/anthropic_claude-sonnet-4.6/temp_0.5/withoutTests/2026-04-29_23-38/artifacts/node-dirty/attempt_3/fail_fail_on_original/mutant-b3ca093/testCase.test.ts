import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should not write data when waitForDrain is true, ensuring each key callback fires exactly once', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);
    const callbackCounts: Record<string, number> = {};

    db.on('load', () => {
      // Write enough data to trigger backpressure (waitForDrain=true)
      // then immediately write more keys - the mutation causes those to
      // be written immediately instead of waiting, potentially causing
      // callbacks to fire multiple times or keys to be written multiple times
      const numKeys = 200;

      for (let i = 0; i < numKeys; i++) {
        const key = `key${i}`;
        callbackCounts[key] = 0;
        db.set(key, `value${i}`, () => {
          callbackCounts[key]++;
        });
      }

      db.once('drain', () => {
        try {
          // Each callback should have fired exactly once
          for (let i = 0; i < numKeys; i++) {
            const key = `key${i}`;
            expect(callbackCounts[key]).toBe(1);
          }

          // Verify the file has exactly numKeys lines (no duplicate writes)
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.split('\n').filter(l => l.length > 0);
          expect(lines.length).toBe(numKeys);

          cleanup();
        } catch (e) {
          cleanup(e);
        }
      });
    });

    db.on('error', cleanup);
  }, 15000);
});