import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() defers when inFlightWrites > 0', () => {
  it('should allow a second close call after drain when first close is called during in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-inflight-close-test.dirty');

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let closeCalled = 0;

    // Patch close to count calls
    const originalClose = db.close.bind(db);
    db.close = function() {
      closeCalled++;
      originalClose();
    };

    db.on('load', () => {
      // Set many values to ensure in-flight writes
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Call close while in-flight writes exist
      // Original: defers, so close will be called again after drain (closeCalled >= 2)
      // Mutated: never defers, so close only called once (closeCalled === 1)
      db.close();
    });

    db.on('write_close', () => {
      try {
        // In original code, close() is called at least twice:
        // once by us, and once by the drain listener set up in close()
        expect(closeCalled).toBeGreaterThanOrEqual(2);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });
  });
});