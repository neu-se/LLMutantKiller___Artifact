import path from 'path';
import os from 'os';
import fs from 'fs';
// @ts-ignore
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty drain via write stream drain handler', () => {
  it('emits drain event through write stream drain handler path', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${process.pid}.db`);
    // @ts-ignore
    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // @ts-ignore
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);

      // @ts-ignore
      ws.write = function(...args: any[]) {
        // Call original but intercept callback to manually emit drain after
        const originalCb = typeof args[args.length - 1] === 'function' ? args.pop() : null;
        const newCb = (err: any) => {
          if (originalCb) originalCb(err);
          // After callback fires, _inFlightWrites should be 0
          // Now manually emit drain on the write stream to trigger the handler
          setImmediate(() => {
            // @ts-ignore
            if (db._waitForDrain) {
              ws.emit('drain');
            }
          });
        };
        origWrite(...args, newCb);
        return false; // force backpressure
      };

      db.on('drain', () => {
        fs.unlink(tmpFile, () => {});
        done();
      });

      db.set('key1', 'value1');
    });
  }, 10000);
});