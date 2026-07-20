import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _waitForDrain break behavior', () => {
  it('should eventually call callback for a key set while flush is pending', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 20;
      const largeValue = 'x'.repeat(2000);
      const callbackOrder: string[] = [];
      let totalCallbacks = 0;
      const expectedTotal = numKeys + 1;

      // Write many large keys to trigger backpressure
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, { data: largeValue, index: i }, () => {
          callbackOrder.push(`key${i}`);
          totalCallbacks++;
          if (totalCallbacks === expectedTotal) {
            try {
              expect(callbackOrder).toHaveLength(expectedTotal);
              try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
              done();
            } catch (e) {
              try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
              done(e as Error);
            }
          }
        });
      }

      // Add one more key after the batch - this tests queue handling
      db.set('final', { data: 'small' }, () => {
        callbackOrder.push('final');
        totalCallbacks++;
        if (totalCallbacks === expectedTotal) {
          try {
            expect(callbackOrder).toHaveLength(expectedTotal);
            try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
            done();
          } catch (e) {
            try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
            done(e as Error);
          }
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    });
  }, 15000);
});