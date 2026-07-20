import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event via waitForDrain path', () => {
  it('should emit drain when _waitForDrain is true, queue empty, and inFlightWrites reaches 0 before stream drains', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Intercept the write stream to control backpressure
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let drainCallback: (() => void) | null = null;

      // Override write to simulate backpressure: always return false
      // and capture the write callback so we can call it after stream drain
      db._writeStream.write = (data: any, cb: any) => {
        // Call the actual write but intercept the return value
        // We need write to return false to set _waitForDrain=true
        // but still eventually call cb and emit 'drain' on the stream
        originalWrite(data, cb);
        return false; // Force backpressure
      };

      db.on('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('key1', 'value1');
    });
  }, 10000);
});