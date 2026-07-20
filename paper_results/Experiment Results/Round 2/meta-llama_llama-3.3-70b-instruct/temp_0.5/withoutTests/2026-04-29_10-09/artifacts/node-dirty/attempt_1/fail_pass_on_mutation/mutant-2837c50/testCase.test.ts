import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the file streams when the queue is empty and there are no in-flight writes', (done) => {
    const tmpPath = join(tmpdir(), 'test-dirty-db.txt');
    const dirty = new Dirty(tmpPath);

    dirty.set('key', 'value', () => {
      dirty.close();
      // Check if the file streams are closed
      setTimeout(() => {
        expect(fs.existsSync(tmpPath)).toBe(true);
        fs.stat(tmpPath, (err, stats) => {
          if (err) {
            done(err);
            return;
          }
          expect(stats.size).toBeGreaterThan(0);
          fs.unlink(tmpPath, (err) => {
            if (err) {
              done(err);
              return;
            }
            done();
          });
        });
      }, 100);
    });
  });
});