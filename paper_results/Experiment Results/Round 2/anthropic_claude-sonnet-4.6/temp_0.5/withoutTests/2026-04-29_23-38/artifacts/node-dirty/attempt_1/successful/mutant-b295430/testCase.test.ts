import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read_close event', () => {
  it('should emit read_close event when the read stream closes', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}.db`);

    // Clean up any existing file
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }

    const db = new Dirty(dbPath);

    db.on('read_close', () => {
      // Clean up
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore
      }
      done();
    });

    // Set a timeout to fail if read_close is never emitted
    const timeout = setTimeout(() => {
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore
      }
      done(new Error('read_close event was never emitted'));
    }, 3000);

    // Clear timeout if done is called
    db.once('read_close', () => {
      clearTimeout(timeout);
    });
  });
});