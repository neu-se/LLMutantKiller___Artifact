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
      
      // Intercept the stream's drain event to set our key BEFORE the handler runs
      // This ensures _waitForDrain is true when the stream drain handler executes
      const originalEmit = writeStream.emit.bind(writeStream);
      let intercepted = false;
      
      writeStream.emit = function(event: string, ...args: any[]) {
        if (event === 'drain' && !intercepted) {
          intercepted = true;
          // Set a key just before drain handler runs - but queue will be empty
          // because we haven't called db.set yet at this point
          // Actually we need _waitForDrain=true when this fires
        }
        return originalEmit(event, ...args);
      };

      // Fill write stream buffer until backpressure
      const chunk = Buffer.alloc(16384, 'a');
      let backpressured = false;
      while (!backpressured) {
        backpressured = !writeStream.write(chunk);
      }
      
      // Now call db.set - this calls _flush() which calls writeStream.write()
      // Since stream is backpressured, write() returns false -> _waitForDrain = true
      // Queue is now empty (this one item was written)
      db.set('key1', { value: 'test' });
      
      // Verify _waitForDrain is true
      console.log('_waitForDrain after set:', (db as any)._waitForDrain);

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error('drain event was never emitted'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});