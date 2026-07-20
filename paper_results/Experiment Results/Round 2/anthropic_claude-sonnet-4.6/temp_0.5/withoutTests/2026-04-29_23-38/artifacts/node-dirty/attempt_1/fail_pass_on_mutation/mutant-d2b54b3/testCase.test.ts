import path from 'path';
import os from 'os';
import fs from 'fs';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty drain event', () => {
  it('emits drain after write stream backpressure resolves with empty queue', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      // Write large values to trigger backpressure
      const largeVal = 'x'.repeat(1024 * 1024); // 1MB
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        fs.unlink(tmpFile, () => {});
        done();
      });
      // Write multiple large entries to trigger backpressure
      for (let i = 0; i < 10; i++) {
        db.set(`key${i}`, largeVal);
      }
    });
  });
});