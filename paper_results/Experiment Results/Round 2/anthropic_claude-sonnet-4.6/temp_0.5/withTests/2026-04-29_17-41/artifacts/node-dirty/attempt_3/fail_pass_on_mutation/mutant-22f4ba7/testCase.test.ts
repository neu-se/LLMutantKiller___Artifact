import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() defers when pending writes exist', () => {
  it('should emit drain before write_close when close() is called with pending writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-close-order-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('load', () => {
      db.set('key1', 'val1');
      db.set('key2', 'val2');

      // Call close() while writes are still pending (before drain)
      db.close();

      db.on('drain', () => {
        events.push('drain');
      });

      db.on('write_close', () => {
        events.push('write_close');
        // In original: drain fires first (writes complete), then close() is called again
        // In mutated: write stream is ended immediately, drain may never fire before write_close
        expect(events[0]).toBe('drain');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});