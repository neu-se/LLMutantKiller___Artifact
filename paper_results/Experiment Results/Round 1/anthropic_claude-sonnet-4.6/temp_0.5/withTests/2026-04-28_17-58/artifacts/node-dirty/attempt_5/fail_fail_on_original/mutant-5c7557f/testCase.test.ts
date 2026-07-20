import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event via write stream backpressure path', () => {
  it('should emit drain event through the write stream drain handler when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');

    // Override fs.createWriteStream to use a tiny highWaterMark to force backpressure
    const originalCreateWriteStream = fs.createWriteStream.bind(fs);
    (fs as any).createWriteStream = function(p: any, opts: any) {
      if (p === file && opts && opts.flags === 'a') {
        opts = { ...opts, highWaterMark: 1 }; // 1 byte forces backpressure
      }
      return originalCreateWriteStream(p, opts);
    };

    const db = new Dirty(file) as any;

    // Restore immediately after construction
    (fs as any).createWriteStream = originalCreateWriteStream;

    db.on('load', () => {
      const timeout = setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('Timed out - drain event never fired'));
      }, 3000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      // Write data larger than highWaterMark (1 byte) to trigger real backpressure
      db.set('key', 'value');
    });
  });
});