import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('emits drain when write stream drains with empty queue and zero in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Wait for a write to complete (inFlightWrites back to 0),
      // then set _waitForDrain=true and emit 'drain' on the write stream
      // to simulate the backpressure recovery path
      db.set('key', 'value', () => {
        // Now inFlightWrites=0, queue is empty
        // Simulate that we were in backpressure state
        (db as any)._waitForDrain = true;
        // Trigger the stream drain handler - this should emit 'drain' on db
        (db as any)._writeStream.emit('drain');
      });

      db.on('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });

    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(new Error('Timed out - drain event not emitted'));
    }, 4000);
  });
});