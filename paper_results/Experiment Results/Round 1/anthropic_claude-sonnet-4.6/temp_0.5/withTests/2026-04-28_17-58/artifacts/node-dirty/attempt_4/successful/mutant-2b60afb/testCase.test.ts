import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event from write stream drain handler', () => {
  it('should emit drain when write stream drain fires with empty queue and zero in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Monkey-patch the write stream to intercept writes and control drain ordering
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let savedCallback: Function | null = null;
      let streamDrainListeners: Function[] = [];

      // Override write to capture the callback and simulate backpressure
      db._writeStream.write = function(data: any, cb: Function) {
        savedCallback = cb;
        // Return false to simulate backpressure (_waitForDrain = true)
        return false;
      };

      // Capture the drain listener that dirty registers
      const originalOn = db._writeStream.on.bind(db._writeStream);
      // The drain listener is already registered, so we need to intercept it differently

      // Instead, manually trigger the sequence:
      // 1. Set a key (write returns false, _waitForDrain = true)
      db.set('key1', 'value1');

      // 2. Now manually fire the write callback (simulates write completing)
      //    _inFlightWrites goes to 0, but _waitForDrain is still true => no drain emitted
      if (savedCallback) savedCallback(null);

      // 3. Now emit 'drain' on the write stream
      //    Original: queue empty, inFlightWrites=0 => emits 'drain'
      //    Mutation: calls _flush() which returns immediately => no 'drain'
      const timeout = setTimeout(() => {
        fs.unlinkSync(file);
        done(new Error('drain event never fired'));
      }, 2000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.unlinkSync(file);
        done();
      });

      db._writeStream.emit('drain');
    });
  });
});