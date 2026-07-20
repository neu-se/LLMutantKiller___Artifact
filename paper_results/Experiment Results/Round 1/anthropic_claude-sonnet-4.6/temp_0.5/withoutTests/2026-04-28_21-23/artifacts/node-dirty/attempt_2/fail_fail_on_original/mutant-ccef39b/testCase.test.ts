import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty close method', () => {
  it('should wait for drain when queue has items but no in-flight writes', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Block _flush so queue accumulates without in-flight writes
      db._flush = function() {}; // no-op

      let setCbCalled = false;
      db.set('key1', 'value1', () => { setCbCalled = true; });
      // Now: _queue.size = 1, _inFlightWrites = 0

      // Restore _flush
      db._flush = Dirty.prototype._flush.bind(db);

      // close() is called: _queue.size=1, _inFlightWrites=0
      // Original (||): 1 || false => true => waits for drain, then closes
      // Mutated (&&): 1 && false => false => closes immediately without waiting
      db.close();

      // In original: close waits for drain, drain fires after write completes
      // In mutated: close proceeds immediately, write stream ends before write completes
      
      db.on('write_close', () => {
        // In original: setCbCalled should be true because drain was awaited
        // In mutated: setCbCalled may be false because stream closed prematurely
        expect(setCbCalled).toBe(true);
        try { fs.unlinkSync(tmpFile); } catch(e) {}
        done();
      });
    });
  });
});