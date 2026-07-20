import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain triggers flush of remaining queue', () => {
  it('should invoke callbacks for all writes even when backpressure causes queue buildup', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);
    // Use a very large value to force write() to return false (backpressure)
    // Node.js default highWaterMark for streams is 16KB
    const largeValue = 'x'.repeat(1024 * 1024); // 1MB to guarantee backpressure
    const totalWrites = 10;
    let completed = 0;

    const cleanup = () => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
    };

    db.on('load', () => {
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, largeValue, (err: Error | null) => {
          completed++;
          if (completed === totalWrites) {
            cleanup();
            done();
          }
        });
      }
    });
  }, 20000);
});