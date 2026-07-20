import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() waits for pending queue writes', () => {
  it('should write data to disk when close() is called with pending queue items before any flush', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new (Dirty as any)(file);

    db.on('load', () => {
      // Set a value - this puts it in the queue
      db.set('testKey', 'testValue');

      // Immediately call close() - at this point:
      // - _queue.size > 0 (item is queued)
      // - _inFlightWrites may be 0 (flush hasn't run yet or just started)
      // Original: waits because _queue.size > 0 OR _inFlightWrites > 0
      // Mutated: may NOT wait because _queue.size > 0 AND _inFlightWrites > 0 may be false
      db.close();
    });

    db.on('write_close', () => {
      // After write stream closes, verify the data was actually written
      try {
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(Boolean);
        
        let found = false;
        for (const line of lines) {
          try {
            const row = JSON.parse(line);
            if (row.key === 'testKey' && row.val === 'testValue') {
              found = true;
              break;
            }
          } catch (e) { /* ignore */ }
        }

        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

        if (found) {
          done();
        } else {
          done(new Error('Data was not written to disk before close - close() did not wait for pending queue'));
        }
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });
  });
});