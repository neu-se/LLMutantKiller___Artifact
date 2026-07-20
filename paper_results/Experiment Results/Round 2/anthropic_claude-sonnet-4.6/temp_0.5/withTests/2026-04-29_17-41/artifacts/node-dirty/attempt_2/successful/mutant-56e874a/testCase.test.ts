import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty _flush waitForDrain guard', () => {
  it('should not proceed with write when _waitForDrain is true', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-guard-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Simulate backpressure by setting _waitForDrain to true
      db._waitForDrain = true;

      // Call set, which internally calls _flush
      db.set('key1', 'val1');

      // Original: _flush returns early because _waitForDrain is true -> _inFlightWrites stays 0
      // Mutated: _flush ignores the guard (if (false) return) -> proceeds to write -> _inFlightWrites = 1
      const inFlightAfterSet = db._inFlightWrites;

      // Reset and manually trigger flush to process the queue and clean up
      db._waitForDrain = false;
      db._flush();

      db.on('drain', () => {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        expect(inFlightAfterSet).toBe(0);
        done();
      });
    });
  });
});