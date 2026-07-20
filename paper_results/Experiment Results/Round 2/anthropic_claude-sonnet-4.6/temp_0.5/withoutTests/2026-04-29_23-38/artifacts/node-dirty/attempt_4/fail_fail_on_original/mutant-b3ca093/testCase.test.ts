import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should emit drain only after all pending writes complete', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;
      let key2Written = false;

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, key2 should be written since we set it before drain
          try {
            expect(key2Written).toBe(true);
            cleanup();
          } catch (e) {
            cleanup(e);
          }
        }
      });

      // Set key1 - triggers flush
      db.set('key1', 'value1');
      // Set key2 with callback - if mutation causes premature drain,
      // key2Written might not be true when drain fires
      db.set('key2', 'value2', () => {
        key2Written = true;
      });
    });

    db.on('error', cleanup);
  }, 10000);
});