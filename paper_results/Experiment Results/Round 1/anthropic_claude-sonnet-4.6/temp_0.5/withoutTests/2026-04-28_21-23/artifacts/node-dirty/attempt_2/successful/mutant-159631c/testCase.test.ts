import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read stream cleanup', () => {
  it('should set _readStream to null after the read stream closes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a pre-existing database file with some data
    fs.writeFileSync(dbPath, JSON.stringify({ key: 'foo', val: 'bar' }) + '\n', 'utf-8');

    const db = new Dirty(dbPath) as any;

    db.once('load', () => {
      // After load (end event), wait a tick for the close event to fire
      setImmediate(() => {
        setImmediate(() => {
          try {
            expect(db._readStream).toBeNull();
            db.close();
            db.once('write_close', () => {
              fs.rmSync(tmpDir, { recursive: true, force: true });
              done();
            });
          } catch (err) {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            done(err);
          }
        });
      });
    });

    db.once('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});