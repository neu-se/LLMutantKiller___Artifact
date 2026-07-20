import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event from write stream drain handler', () => {
  it('should emit drain when write stream drains and queue is empty', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // After load, manually set _waitForDrain = true and _inFlightWrites = 0
      // then trigger the write stream's drain event to exercise the mutation path
      db._waitForDrain = true;
      db._inFlightWrites = 0;
      // queue is already empty at this point

      db.on('drain', () => {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done();
      });

      // Emit drain on the write stream to trigger the handler
      db._writeStream.emit('drain');
    });
  }, 10000);
});