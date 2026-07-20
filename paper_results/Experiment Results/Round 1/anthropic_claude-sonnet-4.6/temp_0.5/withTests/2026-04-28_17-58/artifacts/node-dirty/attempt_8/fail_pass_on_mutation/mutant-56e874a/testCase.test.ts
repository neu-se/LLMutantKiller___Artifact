import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush cork batching', () => {
  it('should write all queued keys to disk before emitting drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('a', '1');
      db.set('b', '2');
      db.set('c', '3');

      db.once('drain', () => {
        // After drain, reload from disk and verify all keys present
        const db2 = new Dirty(file);
        db2.on('load', (size: number) => {
          expect(size).toBe(3);
          expect(db2.get('a')).toBe('1');
          expect(db2.get('b')).toBe('2');
          expect(db2.get('c')).toBe('3');
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });
      });
    });
  });
});