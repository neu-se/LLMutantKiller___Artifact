import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() behavior with pending writes', () => {
  it('should emit drain before write_close when close is called with pending queue', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-close-order-test.dirty');

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('drain', () => {
      events.push('drain');
    });

    db.on('write_close', () => {
      events.push('write_close');
      try {
        // In original: drain fires first (close waits for drain), then write_close
        // In mutated: write_close may fire without drain having fired first
        expect(events[0]).toBe('drain');
        expect(events[1]).toBe('write_close');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });

    db.on('load', () => {
      // Set values to populate the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Immediately call close while queue is non-empty
      // Original: registers once('drain', close) - so drain fires before write_close
      // Mutated: immediately ends write stream - write_close may fire before drain
      db.close();
    });
  });
});