import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain with backpressure', () => {
  it('should emit drain event on Dirty instance when write stream drains and queue is empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    const timeout = setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(new Error('Timeout: drain event never fired on Dirty instance'));
    }, 4000);

    db.on('load', () => {
      // Wait for the write of 'testKey' to complete (via cb), then manually
      // simulate the backpressure scenario by setting _waitForDrain=true
      // and emitting 'drain' on the write stream.
      db.set('testKey', { value: 'hello' }, () => {
        // At this point the write completed normally. Now simulate backpressure:
        // set _waitForDrain = true and _inFlightWrites = 0, queue is empty,
        // then emit 'drain' on the write stream. The original code should
        // then emit 'drain' on the Dirty instance.
        (db as any)._waitForDrain = true;
        (db as any)._inFlightWrites = 0;
        // queue should already be empty after the set callback

        db.once('drain', () => {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          done();
        });

        // Trigger the write stream drain handler
        (db as any)._writeStream.emit('drain');
      });
    });

    db.on('error', (err: Error) => {
      clearTimeout(timeout);
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    });
  });
});