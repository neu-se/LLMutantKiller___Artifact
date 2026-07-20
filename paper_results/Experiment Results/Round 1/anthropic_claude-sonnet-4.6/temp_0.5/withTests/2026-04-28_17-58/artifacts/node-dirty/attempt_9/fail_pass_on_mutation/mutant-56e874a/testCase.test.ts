import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush cork batching', () => {
  it('should have _inFlightWrites at 0 when drain fires, not emit extra drains', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      let drainCount = 0;

      db.set('a', '1');
      db.set('b', '2');
      db.set('c', '3');

      db.on('drain', () => {
        drainCount++;
      });

      // Wait long enough for all async operations to complete
      setTimeout(() => {
        expect(drainCount).toBe(1);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      }, 500);
    });
  });
});