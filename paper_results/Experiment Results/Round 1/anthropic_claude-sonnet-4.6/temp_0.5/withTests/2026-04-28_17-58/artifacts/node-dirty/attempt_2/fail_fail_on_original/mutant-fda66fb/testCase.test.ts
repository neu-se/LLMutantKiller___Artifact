import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain with backpressure', () => {
  it('should call all set callbacks and emit drain after writes complete under backpressure', (done) => {
    const file = path.join(os.tmpdir(), `dirty-drain-mutation-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const totalWrites = 80;
    // Large value to encourage backpressure on the write stream
    const bigVal = 'a'.repeat(65536);
    let callbackCount = 0;

    db.on('load', () => {
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, bigVal, (err: Error | null) => {
          expect(err).toBeFalsy();
          callbackCount++;
        });
      }

      db.once('drain', () => {
        // On original code: drain fires only after all writes and callbacks complete
        // On mutated code: drain logic is inverted, so callbacks may not all be called
        expect(callbackCount).toBe(totalWrites);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});