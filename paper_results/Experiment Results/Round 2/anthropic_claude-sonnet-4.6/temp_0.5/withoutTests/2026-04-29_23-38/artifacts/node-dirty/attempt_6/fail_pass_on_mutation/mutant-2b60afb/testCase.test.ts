import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain callback called after set with file path', () => {
  it('should call the set callback after data is persisted when write stream drains under backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-cb-test-${process.pid}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;

      // Fill the buffer to cause backpressure
      const chunk = Buffer.alloc(16384, 'a');
      let backpressured = false;
      while (!backpressured) {
        backpressured = !writeStream.write(chunk);
      }

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error('set callback was never called'));
      }, 5000);

      // Use the set callback - this fires when the write completes
      // With mutation: if _waitForDrain stays true and queue is empty,
      // _flush() is never called again for subsequent sets
      // Let's write two keys: first causes backpressure, second stays in queue
      // When stream drains: original calls _flush() for second key (queue non-empty)
      // mutated: also calls _flush() for second key (always calls _flush)
      // Hmm, that's the same...
      
      // Actually for the case where queue IS non-empty on drain, both behave the same!
      // The difference is ONLY when queue is empty on drain.
      
      // Write one key that causes backpressure, verify its callback fires
      db.set('key1', { value: 'test' }, (err: Error) => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        if (err) done(err);
        else done();
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});