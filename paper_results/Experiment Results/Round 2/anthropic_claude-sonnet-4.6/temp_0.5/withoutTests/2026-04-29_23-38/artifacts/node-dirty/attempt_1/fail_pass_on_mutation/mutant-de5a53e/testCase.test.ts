import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() write stream destroy', () => {
  it('should emit write_close event after close() is called', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.once('load', () => {
      // Set a value to ensure write stream is active
      db.set('key1', 'value1', () => {
        // Now close the db and wait for write_close event
        let writeCloseFired = false;

        db.once('write_close', () => {
          writeCloseFired = true;
        });

        db.close();

        // Give enough time for write_close to fire (or not)
        setTimeout(() => {
          // Cleanup
          try {
            fs.rmSync(tmpDir, { recursive: true });
          } catch (e) {
            // ignore
          }

          if (writeCloseFired) {
            done();
          } else {
            done(new Error('write_close event was never emitted - writeStream.destroy() was not called'));
          }
        }, 500);
      });
    });
  });
});