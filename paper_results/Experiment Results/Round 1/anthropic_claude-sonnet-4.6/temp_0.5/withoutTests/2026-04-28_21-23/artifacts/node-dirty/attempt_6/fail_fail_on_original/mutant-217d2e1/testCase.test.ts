import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should call set callback after persisting data to disk', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let callbackCalled = false;

      db.set('key1', 'value1', (err?: Error) => {
        callbackCalled = true;
        try {
          expect(err).toBeUndefined();
          expect(db.get('key1')).toBe('value1');

          // Now reload from disk to verify persistence
          const db2 = new Dirty(dbPath);
          db2.on('load', (count: number) => {
            try {
              expect(count).toBe(1);
              expect(db2.get('key1')).toBe('value1');
              db2.close();
              db2.once('write_close', () => {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                done();
              });
            } catch (e) {
              fs.rmSync(tmpDir, { recursive: true, force: true });
              done(e);
            }
          });
        } catch (e) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(e);
        }
      });
    });
  }, 10000);
});