import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() emits write_close via writeStream.destroy()', () => {
  it('should emit write_close event when close() is called after drain', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${process.pid}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      try {
        fs.unlinkSync(file);
      } catch (e) { /* ignore */ }
      done();
    });

    // Timeout to fail if write_close never fires
    setTimeout(() => {
      try {
        fs.unlinkSync(file);
      } catch (e) { /* ignore */ }
      done(new Error('write_close event was never emitted'));
    }, 3000);
  });
});