import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain triggers flush of remaining queue', () => {
  it('should invoke callbacks for all writes even when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);
    const totalWrites = 200;
    // Large value to force write stream backpressure
    const largeValue = 'x'.repeat(65536);
    let completed = 0;

    db.on('load', () => {
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, largeValue, (err: Error | null) => {
          completed++;
          if (completed === totalWrites) {
            rimrafSync(tmpDir);
            done();
          }
        });
      }
    });
  }, 15000);
});