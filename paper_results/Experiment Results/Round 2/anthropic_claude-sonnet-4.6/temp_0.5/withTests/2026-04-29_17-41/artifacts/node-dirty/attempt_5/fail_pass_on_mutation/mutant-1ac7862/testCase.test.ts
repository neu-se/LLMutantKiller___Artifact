import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop mutation detection', () => {
  it('should fire write callbacks for all queued keys before emitting first drain', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      let cb1Done = false;
      let cb2Done = false;
      let firstDrainSeen = false;

      db.set('key1', 'v1', () => { cb1Done = true; });
      db.set('key2', 'v2', () => { cb2Done = true; });

      db.on('drain', () => {
        if (firstDrainSeen) return;
        firstDrainSeen = true;

        // In original: both writes in-flight, drain fires after both complete
        // In mutated: only key1 written, drain fires after key1 completes (key2 not yet written)
        // But wait - drain fires from write callback, so cb1Done is already true
        // The question is whether cb2Done is true at first drain

        // After first drain in mutated code, key2 is still in queue
        // After first drain in original code, both are done
        
        // Check after a tick to ensure all sync callbacks have run
        setImmediate(() => {
          try {
            expect(cb1Done).toBe(true);
            expect(cb2Done).toBe(true);
            db.close();
            db.on('write_close', () => {
              try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
              done();
            });
          } catch (e) {
            try { fs.unlinkSync(tmpFile); } catch (err) { /* ignore */ }
            done(e as Error);
          }
        });
      });
    });
  });
});