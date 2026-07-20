import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should process all queued keys in a single flush when write stream does not need draining', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      // Track how many times _flush is called by monitoring cork calls
      const originalFlush = db._flush.bind(db);
      let flushCount = 0;
      db._flush = function() {
        flushCount++;
        originalFlush();
      };

      db.set('alpha', 'value1');
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      setTimeout(() => {
        // Original: 1 flush for all 3 keys
        // Mutated: 3 flushes (one per key)
        expect(flushCount).toBe(1);
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      }, 500);
    });
  }, 5000);
});