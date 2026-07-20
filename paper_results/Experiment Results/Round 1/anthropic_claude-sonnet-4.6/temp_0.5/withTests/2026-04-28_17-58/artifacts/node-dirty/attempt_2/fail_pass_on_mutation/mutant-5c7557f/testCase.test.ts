import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains and queue is empty with no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Write large values to trigger write stream backpressure (write returns false)
      // This forces the code path through _writeStream.on('drain', ...) handler
      const largeValue = 'x'.repeat(65536); // 64KB per entry
      for (let i = 0; i < 30; i++) {
        db.set(`key${i}`, largeValue);
      }

      const timeout = setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('Timed out waiting for drain event - mutation likely present'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
  });
});