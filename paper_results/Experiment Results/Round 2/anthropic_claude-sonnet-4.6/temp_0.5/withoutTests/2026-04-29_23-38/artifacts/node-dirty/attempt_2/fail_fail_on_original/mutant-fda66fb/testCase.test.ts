import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event', () => {
  it('emits drain only after all pending write callbacks have completed', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let completedCallbacks = 0;
      const totalWrites = 500;

      db.once('drain', () => {
        try {
          // When drain fires, all write callbacks must have been called
          // because drain should only fire when the queue is empty
          expect(completedCallbacks).toBe(totalWrites);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (e) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(e);
        }
      });

      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(16000) }, () => {
          completedCallbacks++;
        });
      }
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 15000);
});