import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains and queue is empty', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-drain-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      let drainReceived = false;

      db.on('drain', () => {
        drainReceived = true;
        // Clean up
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      // Write many large records to force backpressure on the write stream
      const largeVal = 'x'.repeat(65536); // 64KB per record
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeVal);
      }
    });
  });
});