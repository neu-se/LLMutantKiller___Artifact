import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush respects _waitForDrain flag', () => {
  it('should emit drain exactly once after multiple sets that trigger backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);
    let drainCount = 0;

    db.on('load', () => {
      const largeVal = 'x'.repeat(65536);
      for (let i = 0; i < 30; i++) {
        db.set(`key${i}`, largeVal);
      }

      db.on('drain', () => {
        drainCount++;
        fs.rmSync(tmpDir, { recursive: true, force: true });
        expect(drainCount).toBe(1);
        done();
      });
    });
  });
});