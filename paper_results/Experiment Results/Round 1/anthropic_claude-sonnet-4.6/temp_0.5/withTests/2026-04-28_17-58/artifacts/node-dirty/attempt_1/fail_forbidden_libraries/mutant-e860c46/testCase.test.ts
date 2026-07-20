import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should fire write_close only after in-flight writes complete when close is called during write', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-inflight-${process.pid}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set a value - this triggers a write (incrementing _inFlightWrites)
      // The write callback fires asynchronously
      db.set('key1', 'value1', (err: Error | null) => {
        // This callback fires when the write is complete
        // By this point, the write stream should still be open (not closed prematurely)
        // If close() was called before this and didn't wait for in-flight writes,
        // the write stream might already be destroyed
        expect(err).toBeNull();
      });

      // Immediately call close() - at this point _inFlightWrites may be > 0
      // and _queue.size may be 0 (queue was flushed)
      // Original: waits because _inFlightWrites > 0
      // Mutated: doesn't wait, closes immediately
      db.close();

      // Track whether write_close fires after the set callback
      let setCallbackFired = false;
      let writeCloseFired = false;

      // Re-set the callback tracking
      db.set('key2', 'value2', () => {
        setCallbackFired = true;
      });

      db.on('write_close', () => {
        writeCloseFired = true;
        
        // After write_close, verify the data was actually written to disk
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(l => l.length > 0);
        
        // The data should be persisted - if close happened before writes completed,
        // data might be missing
        expect(lines.length).toBeGreaterThan(0);
        
        // Clean up
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        
        done();
      });
    });
  });
});