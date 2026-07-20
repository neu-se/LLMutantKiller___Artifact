import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('close() waits for pending queue items', () => {
  it('should wait for drain when queue has items but no in-flight writes', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      // Set a value - this queues the write and calls _flush()
      // We need to intercept before _flush processes
      db.set('key1', 'value1');
      
      // Close should wait for the write to complete
      db.close();
      
      // The write_close event should only fire after data is written
      db.on('write_close', () => {
        // Verify the data was actually written to disk
        const content = fs.readFileSync(tmpFile, 'utf-8');
        expect(content).toContain('key1');
        fs.unlinkSync(tmpFile);
        done();
      });
    });
  });
});