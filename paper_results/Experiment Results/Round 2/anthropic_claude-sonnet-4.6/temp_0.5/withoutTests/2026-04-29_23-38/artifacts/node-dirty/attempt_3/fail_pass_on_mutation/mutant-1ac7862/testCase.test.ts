import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync, readFileSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should write all queued keys to disk and call all callbacks', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-multflush-${process.pid}.db`);

    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    let callbackCount = 0;
    const totalKeys = 3;

    const onCallback = (_err: unknown) => {
      callbackCount++;
      if (callbackCount === totalKeys) {
        // All callbacks fired - verify all keys are in memory
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBe(2);
        expect(db.get('c')).toBe(3);

        db.close();
        db.on('write_close', () => {
          // Verify all keys were written to disk
          const content = readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n').filter(Boolean);
          expect(lines).toHaveLength(3);

          const keys = lines.map((line) => JSON.parse(line).key);
          expect(keys).toContain('a');
          expect(keys).toContain('b');
          expect(keys).toContain('c');

          try { unlinkSync(dbPath); } catch (_e) {}
          done();
        });
      }
    };

    db.on('load', () => {
      db.set('a', 1, onCallback);
      db.set('b', 2, onCallback);
      db.set('c', 3, onCallback);
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});