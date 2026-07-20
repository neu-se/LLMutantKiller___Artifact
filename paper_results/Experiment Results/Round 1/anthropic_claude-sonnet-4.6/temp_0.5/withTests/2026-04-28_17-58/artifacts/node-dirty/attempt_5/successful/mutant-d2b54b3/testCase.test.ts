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
      // Set up state to trigger the mutated code path:
      // _waitForDrain=true, _queue empty, _inFlightWrites=0
      // Then emit 'drain' on the write stream to trigger the handler
      
      db._waitForDrain = true;
      db._inFlightWrites = 0;
      // queue is already empty
      
      db.on('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      // Trigger the writeStream drain handler directly
      db._writeStream.emit('drain');
    });
  }, 5000);
});