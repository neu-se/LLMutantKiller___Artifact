import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty stream drain handler emits drain when queue empty', () => {
  it('should emit dirty drain event when write stream drain fires with empty queue', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-stream-drain-${process.pid}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a key normally first and wait for it to complete
      db.set('key1', { value: 'initial' });

      db.once('drain', () => {
        // Now manually trigger the writeStream's drain event
        // with an empty queue and _inFlightWrites = 0
        // This directly tests the stream drain handler behavior
        const writeStream = (db as any)._writeStream;

        // Ensure queue is empty and no in-flight writes
        (db as any)._queue.clear();
        (db as any)._inFlightWrites = 0;
        (db as any)._waitForDrain = true; // simulate backpressure state

        const timeout = setTimeout(() => {
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done(new Error('drain event not emitted from stream drain handler'));
        }, 2000);

        db.once('drain', () => {
          clearTimeout(timeout);
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done();
        });

        // Trigger the writeStream drain event directly
        writeStream.emit('drain');
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});