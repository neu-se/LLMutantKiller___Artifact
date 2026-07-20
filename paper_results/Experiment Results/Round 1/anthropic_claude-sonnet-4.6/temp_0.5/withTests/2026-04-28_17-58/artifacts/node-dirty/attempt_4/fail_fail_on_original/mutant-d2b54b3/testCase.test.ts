import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event via waitForDrain path', () => {
  it('emits drain via stream drain handler when queue is empty and inFlightWrites is 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      
      // Override write: actually write the data but return false to signal backpressure
      // The actual underlying stream will still process the data and emit 'drain'
      db._writeStream.write = function(data: any, cb: any) {
        // Do the real write
        const result = originalWrite(data, cb);
        // Restore original write immediately so future writes work normally
        db._writeStream.write = originalWrite;
        // Return false to force _waitForDrain = true
        return false;
      };

      db.on('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('key1', 'value1');
    });
  }, 10000);
});