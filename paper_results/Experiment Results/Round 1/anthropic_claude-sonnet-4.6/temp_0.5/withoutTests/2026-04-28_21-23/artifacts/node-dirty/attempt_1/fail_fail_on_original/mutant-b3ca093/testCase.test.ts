import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush with waitForDrain', () => {
  it('should not flush again when waitForDrain is true (backpressure), ensuring callbacks are called exactly once per key', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    const callbackCounts: Record<string, number> = {};

    db.on('load', () => {
      // Write many keys to potentially trigger backpressure
      const numKeys = 100;
      let completedCallbacks = 0;

      for (let i = 0; i < numKeys; i++) {
        const key = `key-${i}`;
        callbackCounts[key] = 0;
        db.set(key, { index: i, data: 'x'.repeat(100) }, (err) => {
          callbackCounts[key]++;
          completedCallbacks++;
          if (completedCallbacks === numKeys) {
            // Verify each callback was called exactly once
            const anyCalledMoreThanOnce = Object.values(callbackCounts).some(count => count !== 1);
            
            db.close();
            db.on('write_close', () => {
              rimraf(tmpDir).then(() => {
                expect(anyCalledMoreThanOnce).toBe(false);
                done();
              });
            });
          }
        });
      }
    });

    db.on('error', (err) => {
      rimraf(tmpDir).then(() => done(err));
    });
  });
});