import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('read_close event', () => {
  it('should emit read_close event when the read stream closes', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-read-close-${Date.now()}.dirty`);

    // Create the file first so the read stream can open it
    fs.writeFileSync(file, '');

    const db = new Dirty(file);

    db.on('read_close', () => {
      try {
        fs.unlinkSync(file);
      } catch (e) { /* ignore */ }
      done();
    });

    // Set a timeout to fail if read_close is never emitted
    const timeout = setTimeout(() => {
      try {
        fs.unlinkSync(file);
      } catch (e) { /* ignore */ }
      done(new Error('read_close event was never emitted'));
    }, 3000);

    // Clear timeout if done is called
    db.once('read_close', () => clearTimeout(timeout));
  });
});