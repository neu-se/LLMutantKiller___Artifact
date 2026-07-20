import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should not emit drain while there are still items pending in the queue', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      db.set('alpha', 'value1');
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      db.once('drain', () => {
        // On first drain, queue should be empty (original) or still have items (mutated)
        const queueSize = db._queue.size;
        const inFlight = db._inFlightWrites;
        expect(queueSize + inFlight).toBe(0);
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      });
    });
  }, 5000);
});