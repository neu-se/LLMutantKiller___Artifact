import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop processes all queued keys in single flush', () => {
  it('should invoke all set callbacks before the first drain event fires', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      const callbacksFired: string[] = [];
      let drainCount = 0;

      // Set two keys - small enough that _waitForDrain should stay false in original
      db.set('key1', 'v1', () => { callbacksFired.push('key1'); });
      db.set('key2', 'v2', () => { callbacksFired.push('key2'); });

      db.on('drain', () => {
        drainCount++;

        if (drainCount === 1) {
          // On the first drain, in original code both callbacks should have fired
          // (since _waitForDrain stays false for small writes, loop processes all keys)
          // In mutated code, only key1's callback fires on first drain
          try {
            expect(callbacksFired).toContain('key1');
            expect(callbacksFired).toContain('key2');
            expect(callbacksFired.length).toBe(2);

            db.close();
            db.on('write_close', () => {
              try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
              done();
            });
          } catch (e) {
            try { fs.unlinkSync(tmpFile); } catch (err) { /* ignore */ }
            done(e as Error);
          }
        }
      });
    });
  });
});