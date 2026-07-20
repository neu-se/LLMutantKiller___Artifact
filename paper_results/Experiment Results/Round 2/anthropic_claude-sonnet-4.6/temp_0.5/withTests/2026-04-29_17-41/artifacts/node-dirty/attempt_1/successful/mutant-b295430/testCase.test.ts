import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('read_close event', () => {
  it('should emit read_close event when the read stream closes', (done) => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-read-close-${Date.now()}.dirty`);

    // Create a file so the read stream can open and close normally
    fs.writeFileSync(tmpFile, '');

    const db = new Dirty(tmpFile);

    db.on('read_close', () => {
      // Clean up
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done();
    });

    // Set a timeout to fail if read_close is never emitted
    const timeout = setTimeout(() => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(new Error('read_close event was never emitted'));
    }, 3000);

    db.on('read_close', () => {
      clearTimeout(timeout);
    });
  });
});