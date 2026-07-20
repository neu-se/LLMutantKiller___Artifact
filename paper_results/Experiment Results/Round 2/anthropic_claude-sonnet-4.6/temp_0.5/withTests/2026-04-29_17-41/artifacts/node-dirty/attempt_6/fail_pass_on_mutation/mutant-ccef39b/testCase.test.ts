import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should call set callback before write_close even when close is called immediately after set', (done) => {
    const file = path.join(os.tmpdir(), `dirty-inflight-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      const callbackOrder: string[] = [];

      // set() calls _flush() synchronously:
      //   - removes 'foo' from _queue
      //   - increments _inFlightWrites to 1
      //   - calls writeStream.write(data, cb) - cb fires asynchronously
      // After set() returns: _queue.size === 0, _inFlightWrites === 1
      //
      // Original close(): (0 || 1>0) = true → waits for drain, set cb fires
      // Mutated close():  (0 && 1>0) = false → destroys stream immediately
      //   → write stream destroyed before cb fires → set cb may never fire
      //   → write_close fires without set cb having been called

      db.set('foo', 'bar', (err: Error | null) => {
        callbackOrder.push('setCallback');
      });

      // At this point: _queue.size === 0, _inFlightWrites === 1
      db.close();

      // In mutated code: write stream is ended/destroyed immediately
      // write_close fires, but setCallback was never called
      // In original code: close waits for drain, drain fires after write cb,
      // write cb calls setCallback, then close() is called again → write_close

      db.once('write_close', () => {
        const hadSetCallback = callbackOrder.includes('setCallback');
        cleanup();
        expect(hadSetCallback).toBe(true);
        done();
      });

      // Fallback: if write_close never fires (original gets stuck), fail
    }, 10000);
  });
});