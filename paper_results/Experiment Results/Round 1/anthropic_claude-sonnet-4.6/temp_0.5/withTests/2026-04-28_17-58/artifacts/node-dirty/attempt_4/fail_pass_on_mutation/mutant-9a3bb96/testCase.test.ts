import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should emit drain event even when close is called with items in the queue', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-close-drain-test.dirty');

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainFired = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainFired = true;
      });

      // Queue writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Call close immediately while queue is non-empty
      db.close();

      // After close is called with pending queue:
      // Original: defers close until drain fires, so drain WILL fire
      // Mutated: immediately ends stream, drain may never fire
    });

    db.on('write_close', () => {
      try {
        expect(drainFired).toBe(true);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });
  });
});