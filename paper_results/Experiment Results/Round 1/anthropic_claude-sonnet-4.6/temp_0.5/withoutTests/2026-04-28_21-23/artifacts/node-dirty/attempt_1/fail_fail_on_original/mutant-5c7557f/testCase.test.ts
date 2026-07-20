import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event after write stream backpressure resolves with empty queue', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write many large values to try to trigger backpressure
      const largeValue = 'x'.repeat(64 * 1024);
      let drainCount = 0;
      
      db.on('drain', () => {
        drainCount++;
        if (drainCount >= 1) {
          db.close();
        }
      });

      db.on('write_close', () => {
        rimraf(tmpDir).then(() => done()).catch(done);
      });

      // Write multiple large entries to increase chance of backpressure
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, { data: largeValue });
      }
    });

    db.on('error', done);
  });
});