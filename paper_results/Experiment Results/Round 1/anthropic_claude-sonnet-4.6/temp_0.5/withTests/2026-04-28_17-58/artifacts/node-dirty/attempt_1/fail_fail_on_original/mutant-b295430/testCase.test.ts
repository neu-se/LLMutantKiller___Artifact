import { EventEmitter } from 'events';
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
    let readCloseEmitted = false;

    db.on('read_close', () => {
      readCloseEmitted = true;
    });

    db.on('load', () => {
      // After load, the read stream should have closed and emitted read_close
      // Give a small tick for the close event to propagate
      setImmediate(() => {
        try {
          fs.unlinkSync(file);
        } catch (e) { /* ignore */ }

        if (readCloseEmitted) {
          done();
        } else {
          done(new Error('read_close event was never emitted'));
        }
      });
    });
  });
});