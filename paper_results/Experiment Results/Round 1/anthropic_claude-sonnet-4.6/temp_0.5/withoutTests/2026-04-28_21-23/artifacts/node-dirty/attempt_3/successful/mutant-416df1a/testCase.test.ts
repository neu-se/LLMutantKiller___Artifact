import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error emission without callback', () => {
  it('should emit error event when write fails and set is called without a callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = () => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    };

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      const ws = (db as any)._writeStream;

      // Override write to simulate a write error via callback
      const originalWrite = ws.write.bind(ws);
      ws.write = (data: any, cb: (err?: Error | null) => void) => {
        // Call the callback with an error to simulate write failure
        setImmediate(() => cb(new Error('simulated write error')));
        return true; // pretend no backpressure
      };

      let errorEmitted = false;

      db.on('error', () => {
        errorEmitted = true;
      });

      // Call set WITHOUT a callback - cbs.length will be 0
      // Original: !cbs.length && err != null -> emits 'error'
      // Mutated:   cbs.length && err != null -> does NOT emit 'error'
      db.set('testKey', { value: 'testValue' });

      setTimeout(() => {
        cleanup();
        if (errorEmitted) {
          done();
        } else {
          done(new Error('Expected error event was not emitted - mutation detected'));
        }
      }, 500);
    });
  });
});