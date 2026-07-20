import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('close() waits for in-flight writes when queue is empty', () => {
  it('should wait for in-flight writes to complete before closing even when queue is empty', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set a value with a callback - the callback fires when the write completes
      // At the time close() is called below, _flush() will have run:
      //   - _queue is now empty (size === 0)
      //   - _inFlightWrites === 1 (write in progress)
      // Original: waits because _inFlightWrites > 0
      // Mutated: does NOT wait because _queue.size === 0 (condition is false)
      db.set('key1', 'value1');
      
      // Force flush to happen synchronously by accessing internal state
      // After _flush runs: queue is empty, inFlightWrites = 1
      // Now call close - mutated code won't wait, original will
      // We need to call close AFTER flush but BEFORE the write callback
      // _flush is called synchronously within set(), so after set() returns:
      // queue is empty, inFlightWrites >= 1
      db.close();
    });

    let writeCloseCount = 0;
    
    db.on('write_close', () => {
      writeCloseCount++;
      // Read the file and verify data was written
      try {
        const contents = fs.readFileSync(file, 'utf-8');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        
        const hasData = contents.includes('"key1"') && contents.includes('"value1"');
        if (hasData) {
          done();
        } else {
          done(new Error(`Data not fully written. File contents: "${contents}"`));
        }
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });
  });
});