import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event emitted after write stream backpressure with empty queue', () => {
  it('should emit drain when write stream drains and queue is empty after backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'backpressure.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      // Write a large value to force backpressure (exceed highWaterMark of 16KB)
      // The write stream's highWaterMark defaults to 16384 bytes
      // A large enough payload will cause write() to return false
      const largeValue = 'x'.repeat(64 * 1024); // 64KB to exceed highWaterMark

      let drainEmitted = false;

      db.on('drain', () => {
        drainEmitted = true;
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('bigkey', largeValue);
    });

    // Fail-safe timeout
    setTimeout(() => {
      if (!fs.existsSync(tmpDir)) return;
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error('drain event was never emitted - mutation likely present'));
    }, 4000);
  });
});