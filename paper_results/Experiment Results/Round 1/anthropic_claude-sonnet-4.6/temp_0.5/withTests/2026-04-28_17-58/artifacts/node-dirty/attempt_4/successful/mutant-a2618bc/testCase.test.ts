import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty _flush backpressure break', () => {
  it('should only flush one queue item per cycle when backpressure is detected', (done) => {
    const file = path.join(os.tmpdir(), `dirty-bp-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (_e) {}

    const db = new Dirty(file);

    db.on('load', () => {
      let writeCount = 0;

      // Replace write on the actual stream instance to control backpressure
      db._writeStream.write = (_data: any, _cb: any) => {
        writeCount++;
        return false; // always signal backpressure
      };

      // keyA: queue={keyA}, _flush() -> writes keyA (false, _waitForDrain=true), break/no-break. Queue={}.
      db.set('keyA', 'a');
      // keyB: queue={keyB}, _flush() -> returns early. Queue={keyB}.
      db.set('keyB', 'b');
      // keyC: queue={keyB,keyC}, _flush() -> returns early. Queue={keyB,keyC}.
      db.set('keyC', 'c');

      expect(writeCount).toBe(1); // only keyA written so far

      // Trigger _flush() with queue={keyB, keyC} by emitting 'drain'
      db._writeStream.emit('drain');

      // Original: writes keyB then breaks -> writeCount=2
      // Mutation:  writes keyB and keyC  -> writeCount=3
      expect(writeCount).toBe(2);

      try { fs.unlinkSync(file); } catch (_e) {}
      done();
    });
  });
});