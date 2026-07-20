import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should synchronously destroy write stream in end() callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      const writeStream = db._writeStream;
      const originalEnd = writeStream.end.bind(writeStream);
      let destroyedInCallback = false;

      writeStream.end = function(callback?: any) {
        return originalEnd(() => {
          // Call original callback first
          if (callback) callback();
          // Check if destroyed was set synchronously by the callback
          destroyedInCallback = writeStream.destroyed;
        });
      };

      db.close();

      setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
        if (destroyedInCallback) {
          done();
        } else {
          done(new Error('write stream was not destroyed synchronously in end() callback'));
        }
      }, 300);
    });
  });
});