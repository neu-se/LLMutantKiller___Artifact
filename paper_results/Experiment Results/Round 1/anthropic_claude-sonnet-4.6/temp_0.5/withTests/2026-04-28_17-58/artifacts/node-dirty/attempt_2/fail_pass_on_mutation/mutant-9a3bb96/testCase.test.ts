import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for pending writes before closing', () => {
  it('should persist all data written before close() is called when queue is non-empty', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-close-mutation-test.dirty');

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Queue up writes without waiting for drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Immediately close - original code defers close until after drain
      // Mutated code closes immediately, losing pending writes
      db.close();
    });

    db.on('write_close', () => {
      // After write stream closes, open a new DB and verify all data was persisted
      const db2 = new Dirty(file);
      db2.on('load', (length: number) => {
        try {
          expect(length).toBe(3);
          expect(db2.get('key1')).toBe('value1');
          expect(db2.get('key2')).toBe('value2');
          expect(db2.get('key3')).toBe('value3');
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });
  });
});