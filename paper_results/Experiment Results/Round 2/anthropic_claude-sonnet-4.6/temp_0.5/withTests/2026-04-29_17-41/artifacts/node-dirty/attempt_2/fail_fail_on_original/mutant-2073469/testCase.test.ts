import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('drain event via write stream backpressure path', () => {
  it('should emit drain event from write stream drain handler when queue is empty', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `test-bp-${process.pid}.dirty`);
    
    try { fs.unlinkSync(file); } catch (e) {}
    
    const db = new Dirty(file);
    
    db.on('load', () => {
      // Intercept the write stream to force backpressure
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      
      ws.write = function(data, cb) {
        // Restore original write
        ws.write = originalWrite;
        // Call original but return false to signal backpressure
        originalWrite(data, cb);
        return false; // Force backpressure
      };
      
      db.once('drain', () => {
        try { fs.unlinkSync(file); } catch (e) {}
        done();
      });
      
      // Set only one key - so queue will be empty after the one write
      db.set('key1', 'value1');
    });
  });
});