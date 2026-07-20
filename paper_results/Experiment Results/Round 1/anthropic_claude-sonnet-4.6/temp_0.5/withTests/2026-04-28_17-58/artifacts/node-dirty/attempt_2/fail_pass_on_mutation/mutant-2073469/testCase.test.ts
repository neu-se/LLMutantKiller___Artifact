import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains after backpressure with empty queue', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);
    
    // Clean up any existing file
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
    
    const db = new Dirty(tmpFile);
    
    // Write a very large value to force write stream backpressure (_waitForDrain = true)
    // Node.js default highWaterMark for streams is 16KB, so 32MB should reliably trigger it
    const largeValue = Buffer.alloc(1024 * 1024 * 32, 'a').toString();
    
    db.on('load', () => {
      db.on('drain', () => {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done();
      });
      // Single write - after this write completes, queue will be empty
      // If it caused backpressure, the stream drain handler will fire
      // and must emit 'drain' (not "" as in the mutant)
      db.set('bigkey', largeValue);
    });
  }, 30000);
});