import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should destroy the write stream (not just end it) when close() is called', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      const writeStream = db._writeStream;

      writeStream.once('finish', () => {
        // In original code: end(callback) fires, callback calls destroy()
        // destroy() is synchronous in terms of setting destroyed=true
        // In mutated code: end(callback) fires, callback returns undefined
        // destroyed remains false until autoClose handles it asynchronously
        setImmediate(() => {
          const destroyed = writeStream.destroyed;
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
          expect(destroyed).toBe(true);
          done();
        });
      });

      db.close();
    });
  });
});