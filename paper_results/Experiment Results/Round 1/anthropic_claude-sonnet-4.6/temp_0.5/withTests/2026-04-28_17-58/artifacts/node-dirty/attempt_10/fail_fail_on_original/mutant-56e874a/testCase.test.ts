import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush cork batching', () => {
  it('should fire all set callbacks after drain when using cork batching', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      const events: string[] = [];

      db.set('a', '1', () => events.push('cb_a'));
      db.set('b', '2', () => events.push('cb_b'));
      db.set('c', '3', () => events.push('cb_c'));

      db.once('drain', () => {
        events.push('drain');
        // With cork: all 3 writes batched, callbacks fire together after uncork
        // drain fires from write stream's drain event or from last inFlightWrite
        // Give time for any remaining callbacks
        setImmediate(() => {
          // All callbacks must have fired by now
          expect(events).toContain('cb_a');
          expect(events).toContain('cb_b');
          expect(events).toContain('cb_c');
          expect(events).toContain('drain');
          // drain should come after all callbacks with cork batching
          const drainIdx = events.indexOf('drain');
          expect(drainIdx).toBe(events.length - 1);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });
      });
    });
  });
});