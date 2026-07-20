import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event mutation detection', () => {
  it('should emit drain when write stream drains with empty queue after backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-mutation-test-${process.pid}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      
      // Fill the write stream buffer by writing directly to it until it signals backpressure
      // Then set a key - _flush will try to write but stream is full, _waitForDrain = true
      // When stream drains: original emits 'drain' (queue empty), mutated calls _flush() (no-op)
      
      const chunk = Buffer.alloc(16384, 'a'); // 16KB chunks
      let backpressured = false;
      
      // Fill the stream buffer until it returns false
      while (!backpressured) {
        backpressured = !writeStream.write(chunk);
      }

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error('drain event was never emitted'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });

      // Now set a key - _flush will call writeStream.write() which returns false (backpressured)
      // so _waitForDrain = true, queue becomes empty after this one item
      db.set('key1', { value: 'test' });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});