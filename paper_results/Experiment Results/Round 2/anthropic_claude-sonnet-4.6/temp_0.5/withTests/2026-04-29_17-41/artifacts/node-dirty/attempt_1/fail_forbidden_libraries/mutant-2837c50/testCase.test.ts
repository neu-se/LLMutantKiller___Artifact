import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() retries after drain when writes are pending', () => {
  it('should fire write_close event after close() is called with pending writes', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-close-${process.pid}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set a value to queue a write
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      
      // Call close() immediately - the queue likely still has pending items
      // In the original code, close() registers a 'drain' listener to retry close()
      // In the mutated code, close() registers a no-op listener, so write_close never fires
      db.close();
    });

    db.on('write_close', () => {
      // Clean up
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });

    // If write_close never fires, the test will time out
  }, 5000);
});