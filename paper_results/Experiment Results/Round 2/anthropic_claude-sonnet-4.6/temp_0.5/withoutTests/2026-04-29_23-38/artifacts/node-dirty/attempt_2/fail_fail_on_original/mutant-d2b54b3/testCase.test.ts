import path from 'path';
import os from 'os';
import fs from 'fs';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty drain event after write stream backpressure on last write', () => {
  it('emits drain when write stream drains after backpressure on the last queued write', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${process.pid}.db`);
    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      // Monkey-patch the write stream to force backpressure on the next write
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let writeCount = 0;
      
      db._writeStream.write = function(data, cb) {
        writeCount++;
        // Force backpressure on first write by returning false
        const result = originalWrite(data, cb);
        return false; // Always signal backpressure
      };
      
      db.on('drain', () => {
        fs.unlink(tmpFile, () => {});
        done();
      });
      
      // Write a single value - backpressure will be forced
      db.set('key1', 'value1');
    });
  }, 10000);
});