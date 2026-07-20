import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain via stream drain handler', () => {
  it('should emit drain when stream drains, queue is empty, and no in-flight writes', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}-${Date.now()}.db`);

    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      const dbAny = db as any;

      // Simulate the exact state that triggers the mutation:
      // - queue is empty (no pending writes)
      // - _inFlightWrites is 0 (no writes in flight)
      // - _waitForDrain is true (was waiting for drain)
      // Then emit 'drain' on the write stream

      // First do a real set to ensure write stream is open
      db.set('key1', 'val1', () => {
        // Now manually set up the state and trigger the stream drain handler
        dbAny._waitForDrain = true;
        dbAny._queue.clear();
        dbAny._inFlightWrites = 0;

        const timeout = setTimeout(() => {
          try { fs.unlinkSync(dbPath); } catch {}
          done(new Error('drain event never fired'));
        }, 2000);

        db.once('drain', () => {
          clearTimeout(timeout);
          try { fs.unlinkSync(dbPath); } catch {}
          done();
        });

        // Trigger the stream drain handler directly
        dbAny._writeStream.emit('drain');
      });
    });
  });
});