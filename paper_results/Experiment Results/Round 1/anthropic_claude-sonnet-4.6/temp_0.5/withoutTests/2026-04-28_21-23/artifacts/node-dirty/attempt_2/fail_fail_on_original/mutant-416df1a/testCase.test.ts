import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error emission without callback', () => {
  it('should emit error event when write fails and set is called without a callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    const cleanup = () => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    };

    db.on('load', () => {
      // Destroy the write stream so any write attempt will fail
      const ws = (db as any)._writeStream;
      ws.destroy();

      // Wait for the stream to be fully destroyed
      ws.on('close', () => {
        let errorEmitted = false;

        db.on('error', () => {
          errorEmitted = true;
        });

        // Call set WITHOUT a callback - cbs.length will be 0
        // Original: !cbs.length && err != null -> emits 'error'
        // Mutated:   cbs.length && err != null -> does NOT emit 'error'
        (db as any).set('testKey', { value: 'testValue' });

        setTimeout(() => {
          cleanup();
          if (errorEmitted) {
            done();
          } else {
            done(new Error('Expected error event was not emitted - mutation may be present'));
          }
        }, 500);
      });
    });

    db.on('error', () => {
      // Ignore load-phase errors
    });
  });
});