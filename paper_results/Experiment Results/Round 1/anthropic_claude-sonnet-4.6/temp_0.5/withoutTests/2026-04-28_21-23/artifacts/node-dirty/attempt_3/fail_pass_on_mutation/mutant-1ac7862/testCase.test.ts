import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should persist all keys set before drain event fires', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      db.set('key3', 'val3');

      db.once('drain', () => {
        // After drain, open a new db instance to verify all keys were persisted
        const db2 = new Dirty(dbPath);
        db2.on('load', (count: number) => {
          try {
            expect(count).toBe(3);
            expect(db2.get('key1')).toBe('val1');
            expect(db2.get('key2')).toBe('val2');
            expect(db2.get('key3')).toBe('val3');
            try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
            done();
          } catch (e) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
            done(e);
          }
        });
        db2.on('error', (err: Error) => {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done(err);
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
      done(err);
    });
  });
});