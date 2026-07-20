import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() defers when queue has pending items', () => {
  it('should write all queued items to disk before closing when close() called during backpressure', (done) => {
    const file = path.join(os.tmpdir(), `dirty-backpressure-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Write a large amount of data to trigger backpressure (_waitForDrain = true)
      // so that some keys remain in _queue when close() is called
      const bigVal = 'x'.repeat(1024 * 64);
      let keysWritten = 0;

      // Force backpressure by writing many large values
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, bigVal);
        keysWritten++;
      }

      // At this point, _waitForDrain may be true and _queue.size > 0
      // Original: close() defers until drain, all keys eventually written
      // Mutated: close() ends stream immediately, queued keys may be lost
      db.close();

      db.on('write_close', () => {
        const db2 = new Dirty(file);
        db2.on('load', (count: number) => {
          // All 20 keys should have been written
          expect(count).toBe(keysWritten);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        });
      });
    });
  });
});