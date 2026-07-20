import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty drain event count', () => {
  it('should fire the drain event exactly once after a single set operation', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-drain-count-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      db.set('foo', 'bar', () => {
        // After callback fires, wait a bit to see if drain fires more than once
        setTimeout(() => {
          expect(drainCount).toBe(1);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }, 200);
      });
    });
  });
});